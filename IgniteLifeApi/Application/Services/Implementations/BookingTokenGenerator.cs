using IgniteLifeApi.Application.Dtos;
using IgniteLifeApi.Domain.Entities;
using IgniteLifeApi.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class BookingTokenGenerator
{
    private readonly ApplicationDbContext _dbContext;

    public BookingTokenGenerator(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // =========================================================
    // Public API
    // =========================================================
    public async Task<List<BookingToken>> GenerateBookingTokensAsync(
        BowenService service,
        BookingRules rules,
        CancellationToken cancellationToken = default)
    {
        var (windowStartUtc, windowEndUtc) = GetGenerationWindowUtc(rules);

        var blocked = await GetBlockedTimesAsync(
            serviceId: service.Id,
            rules: rules,
            windowStartUtc: windowStartUtc,
            windowEndUtc: windowEndUtc,
            cancellationToken: cancellationToken);

        return GenerateTokensForDateRange(
            serviceId: service.Id,
            rules: rules,
            windowStartUtc: windowStartUtc,
            windowEndUtc: windowEndUtc,
            blockedTimes: blocked);
    }

    // =========================================================
    // Types
    // =========================================================
    public record BlockedTimesRange(DateTime StartTimeUtc, DateTime EndTimeUtc);

    // =========================================================
    // Orchestration helpers
    // =========================================================
    private static (DateTime StartUtc, DateTime EndUtc) GetGenerationWindowUtc(BookingRules rules)
    {
        var now = DateTime.UtcNow;
        var start = now.AddHours(rules.MinAdvanceBookingHours);
        var end = now.AddDays(rules.MaxAdvanceBookingDays);
        return (start, end);
    }

    private async Task<List<BlockedTimesRange>> GetBlockedTimesAsync(
        Guid serviceId,
        BookingRules rules,
        DateTime windowStartUtc,
        DateTime windowEndUtc,
        CancellationToken cancellationToken)
    {
        var bookingBlocks = await FetchActiveBookingBlocksAsync(
            serviceId, windowStartUtc, windowEndUtc, cancellationToken);

        var ruleBlocks = MapRuleBlockedPeriods(rules.BlockedPeriods, windowStartUtc, windowEndUtc);

        // Combine & order. (Assumes individual collections have no internal overlaps.)
        return bookingBlocks
            .Concat(ruleBlocks)
            .OrderBy(b => b.StartTimeUtc)
            .ToList();
    }

    private async Task<List<BlockedTimesRange>> FetchActiveBookingBlocksAsync(
        Guid serviceId,
        DateTime windowStartUtc,
        DateTime windowEndUtc,
        CancellationToken cancellationToken)
    {
        return await _dbContext.BookingSessions
            .AsNoTracking()
            .Where(b => b.ServiceId == serviceId && b.IsActive)
            .Where(b => b.StartTimeUtc < windowEndUtc && b.EndTimeUtc > windowStartUtc) // overlaps window
            .Select(b => new BlockedTimesRange(b.StartTimeUtc, b.EndTimeUtc))
            .ToListAsync(cancellationToken);
    }

    private static List<BlockedTimesRange> MapRuleBlockedPeriods(
        IEnumerable<BookingRuleBlockedPeriod> blockedPeriods,
        DateTime windowStartUtc,
        DateTime windowEndUtc)
    {
        if (blockedPeriods is null) return new();

        return blockedPeriods
            .Where(bp => bp.StartDateTimeUtc < windowEndUtc && bp.EndDateTimeUtc > windowStartUtc) // overlaps window
            .Select(bp => new BlockedTimesRange(bp.StartDateTimeUtc, bp.EndDateTimeUtc))
            .OrderBy(b => b.StartTimeUtc)
            .ToList();
    }

    private List<BookingToken> GenerateTokensForDateRange(
        Guid serviceId,
        BookingRules rules,
        DateTime windowStartUtc,
        DateTime windowEndUtc,
        IReadOnlyList<BlockedTimesRange> blockedTimes)
    {
        var results = new List<BookingToken>();

        foreach (var day in EachDay(windowStartUtc.Date, windowEndUtc.Date))
        {
            foreach (var (openUtc, closeUtc) in GetOpeningWindowsForDay(rules, day, windowStartUtc, windowEndUtc))
            {
                var tokens = GenerateTokensForWindow(
                    serviceId: serviceId,
                    startUtc: openUtc,
                    endUtc: closeUtc,
                    slotMinutes: rules.SlotDurationMinutes,
                    bufferMinutes: rules.BufferBetweenBookingsMinutes,
                    blockedTimes: blockedTimes);

                if (tokens.Count > 0)
                    results.AddRange(tokens);
            }
        }

        return results;
    }

    // =========================================================
    // Slot generation helpers
    // =========================================================
    private static IEnumerable<(DateTime StartUtc, DateTime EndUtc)> GetOpeningWindowsForDay(
        BookingRules rules,
        DateTime dayUtc,
        DateTime globalStartUtc,
        DateTime globalEndUtc)
    {
        // Support multiple windows per day if your data ever has them
        var windows = rules.OpeningHours
            .Where(o => o.DayOfWeek == dayUtc.DayOfWeek && !o.IsClosed)
            .Select(o => (
                StartUtc: dayUtc.Add(o.OpenTimeUtc.ToTimeSpan()),
                EndUtc: dayUtc.Add(o.CloseTimeUtc.ToTimeSpan())
            ))
            .Select(w => ClipToWindow(w.StartUtc, w.EndUtc, globalStartUtc, globalEndUtc))
            .Where(w => w.StartUtc < w.EndUtc)
            .OrderBy(w => w.StartUtc);

        return windows;
    }

    private static List<BookingToken> GenerateTokensForWindow(
        Guid serviceId,
        DateTime startUtc,
        DateTime endUtc,
        int slotMinutes,
        int bufferMinutes,
        IReadOnlyList<BlockedTimesRange> blockedTimes)
    {
        var tokens = new List<BookingToken>();
        if (slotMinutes <= 0) return tokens;

        var slotStart = startUtc;

        // Step by (slot + buffer) so produced tokens already respect spacing
        while (slotStart.AddMinutes(slotMinutes) <= endUtc)
        {
            var slotEnd = slotStart.AddMinutes(slotMinutes);

            if (!HasConflict(slotStart, slotEnd, blockedTimes, bufferMinutes))
            {
                tokens.Add(BookingToken.Create(serviceId, slotStart, slotEnd));
            }

            slotStart = slotStart.AddMinutes(slotMinutes + bufferMinutes);
        }

        return tokens;
    }

    private static bool HasConflict(
        DateTime slotStartUtc,
        DateTime slotEndUtc,
        IReadOnlyList<BlockedTimesRange> blockedTimes,
        int bufferMinutes)
    {
        // Buffer applies before/after any blocked period
        foreach (var b in blockedTimes)
        {
            var expandedStart = b.StartTimeUtc.AddMinutes(-bufferMinutes);
            var expandedEnd = b.EndTimeUtc.AddMinutes(bufferMinutes);

            if (slotStartUtc < expandedEnd && slotEndUtc > expandedStart)
                return true;
        }
        return false;
    }

    // =========================================================
    // Utilities
    // =========================================================
    private static IEnumerable<DateTime> EachDay(DateTime startDateUtc, DateTime endDateUtcInclusive)
    {
        for (var d = startDateUtc; d <= endDateUtcInclusive; d = d.AddDays(1))
            yield return d;
    }

    private static (DateTime StartUtc, DateTime EndUtc) ClipToWindow(
        DateTime rangeStartUtc, DateTime rangeEndUtc, DateTime windowStartUtc, DateTime windowEndUtc)
    {
        var start = rangeStartUtc < windowStartUtc ? windowStartUtc : rangeStartUtc;
        var end = rangeEndUtc > windowEndUtc ? windowEndUtc : rangeEndUtc;
        return (start, end);
    }
}
