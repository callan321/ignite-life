using IgniteLifeApi.Domain.Entities;
using IgniteLifeApi.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public static class BookingTestHelpers
{
    public static ApplicationDbContext NewDb()
    {
        var opts = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .EnableSensitiveDataLogging()
            .Options;

        return new ApplicationDbContext(opts);
    }

    public static BowenService BuildService() => new()
    {
        Id = Guid.NewGuid(),
        Title = "Bowen Therapy",
        Price = 120m,
        DurationMinutes = 60,
        Description = "Relax & reset",
        IsActive = true
    };

    public static BookingRules BuildRulesForDay(
        DayOfWeek dayOfWeek,
        int openHourUtc,
        int closeHourUtc,
        int slotMinutes = 30,
        int bufferMinutes = 0,
        int minAdvanceHours = 6,
        int maxAdvanceDays = 7)
    {
        var rules = new BookingRules
        {
            Id = Guid.NewGuid(),
            SlotDurationMinutes = slotMinutes,
            BufferBetweenBookingsMinutes = bufferMinutes,
            MinAdvanceBookingHours = minAdvanceHours,
            MaxAdvanceBookingDays = maxAdvanceDays,
            OpeningHours = new List<BookingRuleOpeningHour>(),
            BlockedPeriods = new List<BookingRuleBlockedPeriod>()
        };

        AddOpeningWindow(rules, dayOfWeek, openHourUtc, closeHourUtc);
        return rules;
    }

    // NEW: build a rules object with a single closed entry for a day
    public static BookingRules BuildClosedRulesForDay(
        DayOfWeek dayOfWeek,
        int slotMinutes = 30,
        int bufferMinutes = 0,
        int minAdvanceHours = 6,
        int maxAdvanceDays = 7)
    {
        var rules = new BookingRules
        {
            Id = Guid.NewGuid(),
            SlotDurationMinutes = slotMinutes,
            BufferBetweenBookingsMinutes = bufferMinutes,
            MinAdvanceBookingHours = minAdvanceHours,
            MaxAdvanceBookingDays = maxAdvanceDays,
            OpeningHours = new List<BookingRuleOpeningHour>(),
            BlockedPeriods = new List<BookingRuleBlockedPeriod>()
        };

        AddClosedDay(rules, dayOfWeek);
        return rules;
    }

    // NEW: add an open window to any rules object
    public static BookingRules AddOpeningWindow(BookingRules rules, DayOfWeek dow, int openHourUtc, int closeHourUtc)
    {
        rules.OpeningHours.Add(new BookingRuleOpeningHour
        {
            Id = Guid.NewGuid(),
            DayOfWeek = dow,
            IsClosed = false,
            OpenTimeUtc = new TimeOnly(openHourUtc, 0),
            CloseTimeUtc = new TimeOnly(closeHourUtc, 0),
            BookingRulesId = rules.Id
        });
        return rules;
    }

    // NEW: add a closed entry to any rules object
    public static BookingRules AddClosedDay(BookingRules rules, DayOfWeek dow)
    {
        rules.OpeningHours.Add(new BookingRuleOpeningHour
        {
            Id = Guid.NewGuid(),
            DayOfWeek = dow,
            IsClosed = true,
            OpenTimeUtc = new TimeOnly(0, 0),
            CloseTimeUtc = new TimeOnly(0, 0),
            BookingRulesId = rules.Id
        });
        return rules;
    }

    public static DateTime DayN(int daysFromNow) => DateTime.UtcNow.Date.AddDays(daysFromNow);
}
