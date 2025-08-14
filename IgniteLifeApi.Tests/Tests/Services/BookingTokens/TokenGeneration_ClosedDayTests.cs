using FluentAssertions;
using IgniteLifeApi.Domain.Entities;

namespace IgniteLifeApi.Tests.Tests.Services.BookingTokens
{
    public class TokenGeneration_ClosedDayTests
    {
        [Fact]
        public async Task ProducesNoSlots_WhenDayIsClosed()
        {
            var dayStart = BookingTestHelpers.DayN(3);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildClosedRulesForDay(
                dow, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);

            var gen = new BookingTokenGenerator(db);

            var tokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .ToList();

            tokens.Should().BeEmpty();
        }

        [Fact]
        public async Task ClosedDay_DoesNotAffect_OtherOpenDays()
        {
            var dayA = BookingTestHelpers.DayN(2);
            var dowA = dayA.DayOfWeek;
            var dayB = dayA.AddDays(1);
            var dowB = dayB.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildClosedRulesForDay(
                dowA, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);

            BookingTestHelpers.AddOpeningWindow(rules, dowB, 9, 10);

            var gen = new BookingTokenGenerator(db);
            var tokens = await gen.GenerateBookingTokensAsync(service, rules);

            tokens.Where(t => t.StartTimeUtc.Date == dayA).Should().BeEmpty();
            tokens.Where(t => t.StartTimeUtc.Date == dayB)
                  .Select(t => t.StartTimeUtc.TimeOfDay)
                  .Should().Equal(TimeSpan.FromHours(9), TimeSpan.FromHours(9) + TimeSpan.FromMinutes(30));
        }

        [Fact]
        public async Task ClosedEntry_IsIgnored_WhenAnotherOpenEntryExists_SameDay()
        {
            var dayStart = BookingTestHelpers.DayN(2);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildClosedRulesForDay(
                dow, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);

            BookingTestHelpers.AddOpeningWindow(rules, dow, 11, 12);

            var starts = (await new BookingTokenGenerator(db).GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            starts.Should().Equal(TimeSpan.FromHours(11), TimeSpan.FromHours(11) + TimeSpan.FromMinutes(30));
        }

        [Fact]
        public async Task ProducesNoSlots_WhenAllEntriesForDayAreClosed()
        {
            var dayStart = BookingTestHelpers.DayN(2);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildClosedRulesForDay(
                dow, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);

            // Add another closed entry same day
            BookingTestHelpers.AddClosedDay(rules, dow);

            var tokens = (await new BookingTokenGenerator(db).GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .ToList();

            tokens.Should().BeEmpty();
        }

        [Fact]
        public async Task ClosedDay_Ignores_Sessions_And_BlockedPeriods()
        {
            var dayStart = BookingTestHelpers.DayN(3);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            await db.BowenServices.AddAsync(service);

            await db.BookingSessions.AddAsync(new BookingSession
            {
                Id = Guid.NewGuid(),
                ServiceId = service.Id,
                Service = service,
                IsActive = true,
                StartTimeUtc = dayStart.AddHours(9),
                EndTimeUtc = dayStart.AddHours(10),
                MaxCapacity = 1,
                ReservedCount = 0
            });
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildClosedRulesForDay(
                dow, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);

            // (Optional) Add a rule block; still irrelevant for closed day
            rules.BlockedPeriods.Add(new BookingRuleBlockedPeriod
            {
                Id = Guid.NewGuid(),
                BookingRulesId = rules.Id,
                StartDateTimeUtc = dayStart.AddHours(10),
                EndDateTimeUtc = dayStart.AddHours(11),
                Description = "Irrelevant – still closed"
            });

            var tokens = (await new BookingTokenGenerator(db).GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .ToList();

            tokens.Should().BeEmpty();
        }

        [Fact]
        public async Task OtherOpenDay_StillRespects_MinAdvance_WhenPreviousDayIsClosed()
        {
            var dayA = BookingTestHelpers.DayN(1);
            var dowA = dayA.DayOfWeek;
            var dayB = dayA.AddDays(1);
            var dowB = dayB.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildClosedRulesForDay(
                dowA, slotMinutes: 60, bufferMinutes: 0, minAdvanceHours: 30, maxAdvanceDays: 3);

            BookingTestHelpers.AddOpeningWindow(rules, dowB, 14, 16);

            var gen = new BookingTokenGenerator(db);
            var now = DateTime.UtcNow;

            var tokens = await gen.GenerateBookingTokensAsync(service, rules);

            tokens.Where(t => t.StartTimeUtc.Date == dayA).Should().BeEmpty();

            var dayBTokens = tokens.Where(t => t.StartTimeUtc.Date == dayB).ToList();
            dayBTokens.Should().NotBeEmpty();
            dayBTokens.Should().OnlyContain(t =>
                t.StartTimeUtc >= now.AddHours(30) &&
                t.StartTimeUtc.TimeOfDay >= TimeSpan.FromHours(14) &&
                t.EndTimeUtc.TimeOfDay <= TimeSpan.FromHours(16));
        }
    }
}
