using FluentAssertions;

namespace IgniteLifeApi.Tests.Tests.Services.BookingTokens
{
    public class TokenGeneration_WindowClippingTests
    {
        [Fact]
        public async Task ClipsOpeningWindow_ToGenerationWindow()
        {
            // Arrange
            var dayStart = BookingTestHelpers.DayN(1);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                targetDow,
                openHourUtc: 8,
                closeHourUtc: 12,
                slotMinutes: 60,
                bufferMinutes: 0,
                minAdvanceHours: 30, // push start later than opening time
                maxAdvanceDays: 2);

            var gen = new BookingTokenGenerator(db);
            var now = DateTime.UtcNow;

            // Act
            var tokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .ToList();

            // Assert: all tokens respect global window clipping
            tokens.Should().OnlyContain(t => t.StartTimeUtc >= now.AddHours(30));
            tokens.Should().OnlyContain(t => t.EndTimeUtc <= now.AddDays(2));
        }

        [Fact]
        public async Task NoTokens_WhenMinAdvanceAfterClose_OnThatDay()
        {
            // If MinAdvance lands AFTER the day's close, there should be no tokens for that day.
            var dayStart = BookingTestHelpers.DayN(1);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            // Compute a MinAdvance that is just after this day's close (12:00)
            var afterClose = dayStart.AddHours(12).AddMinutes(1);
            var minAdvanceHours = (int)Math.Ceiling((afterClose - DateTime.UtcNow).TotalHours);

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 9, 12,
                slotMinutes: 30,
                bufferMinutes: 0,
                minAdvanceHours: minAdvanceHours,
                maxAdvanceDays: 2);

            var gen = new BookingTokenGenerator(db);
            var dayTokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .ToList();

            dayTokens.Should().BeEmpty();
        }

        [Fact]
        public async Task UsesLaterWindow_IfMinAdvanceFallsBetweenWindows()
        {
            // Two windows: 09:00–10:00 and 11:00–12:00.
            // MinAdvance set ~10:30 (gap between windows). Expect tokens only in the 11–12 window.
            var dayStart = BookingTestHelpers.DayN(1);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(dow, 9, 10, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 2);
            BookingTestHelpers.AddOpeningWindow(rules, dow, 11, 12);

            // Put MinAdvance into the gap: ~10:30
            var gapTime = dayStart.AddHours(10).AddMinutes(30);
            rules.MinAdvanceBookingHours = (int)Math.Ceiling((gapTime - DateTime.UtcNow).TotalHours);

            var gen = new BookingTokenGenerator(db);

            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            // Only the second window should produce tokens: 11:00, 11:30 (slot=30, buffer=0)
            starts.Should().Equal(TimeSpan.FromHours(11), TimeSpan.FromHours(11) + TimeSpan.FromMinutes(30));
        }

        [Fact]
        public async Task EnforcesMaxAdvance_WhenItCutsMidWindow()
        {
            // Wide opening (08–20). MaxAdvance set to ~now+1d so global end cuts inside the opening.
            // All tokens on that day must end <= global end.
            var dayStart = BookingTestHelpers.DayN(1);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 8, 20,
                slotMinutes: 60,
                bufferMinutes: 0,
                minAdvanceHours: 1,
                maxAdvanceDays: 1); // global end = now + 1 day

            var gen = new BookingTokenGenerator(db);
            var globalEnd = DateTime.UtcNow.AddDays(1);

            var dayTokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .ToList();

            dayTokens.Should().NotBeEmpty(); // sanity check
            dayTokens.Should().OnlyContain(t => t.EndTimeUtc <= globalEnd);
        }

        [Fact]
        public async Task NoTokens_WhenGlobalWindow_LeavesLessThanSlotDuration()
        {
            // If global window (MinAdvance..MaxAdvance) remaining in an open window is < slot duration, no tokens.
            var dayStart = BookingTestHelpers.DayN(1);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            // Open 09:00–12:00, slot=60
            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 9, 12,
                slotMinutes: 60,
                bufferMinutes: 0,
                minAdvanceHours: 1,
                maxAdvanceDays: 2);

            // Force MinAdvance to ~11:10 (leaving < 60 minutes to close)
            var lateStart = dayStart.AddHours(11).AddMinutes(10);
            rules.MinAdvanceBookingHours = (int)Math.Ceiling((lateStart - DateTime.UtcNow).TotalHours);

            var gen = new BookingTokenGenerator(db);

            var tokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .ToList();

            tokens.Should().BeEmpty();
        }
    }
}