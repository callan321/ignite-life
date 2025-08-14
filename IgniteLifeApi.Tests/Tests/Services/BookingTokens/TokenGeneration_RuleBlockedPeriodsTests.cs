using FluentAssertions;
using IgniteLifeApi.Domain.Entities;

namespace IgniteLifeApi.Tests.Tests.Services.BookingTokens
{
    public class TokenGeneration_RuleBlockedPeriodsTests
    {
        [Fact]
        public async Task SkipsSlots_ThatOverlap_RuleBlockedPeriods_WithBufferExpansion()
        {
            // Arrange
            var dayStart = BookingTestHelpers.DayN(3);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                targetDow, 9, 12,
                slotMinutes: 30,
                bufferMinutes: 15, // buffer expands blocked ±15m
                minAdvanceHours: 1,
                maxAdvanceDays: 10);

            // Block 10:00–10:30 → expanded 09:45–10:45
            rules.BlockedPeriods.Add(new BookingRuleBlockedPeriod
            {
                Id = Guid.NewGuid(),
                BookingRulesId = rules.Id,
                StartDateTimeUtc = dayStart.AddHours(10),
                EndDateTimeUtc = dayStart.AddHours(10).AddMinutes(30),
                Description = "Mid-morning"
            });

            var gen = new BookingTokenGenerator(db);

            // Act
            var tokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .ToList();

            // Step = 30 + 15 = 45 mins → candidates: 09:00, 09:45, 10:30, 11:15
            tokens.Select(t => t.StartTimeUtc.TimeOfDay).Should().Contain(TimeSpan.FromHours(9));
            tokens.Select(t => t.StartTimeUtc.TimeOfDay)
                  .Should().NotContain(new[]
                  {
                  TimeSpan.FromHours(9) + TimeSpan.FromMinutes(45), // 09:45
                  TimeSpan.FromHours(10) + TimeSpan.FromMinutes(30) // 10:30
                  });
            tokens.Select(t => t.StartTimeUtc.TimeOfDay).Should().Contain(TimeSpan.FromHours(11) + TimeSpan.FromMinutes(15));
        }

        [Fact]
        public async Task TouchingEdges_Blocked_WhenBufferPositive()
        {
            // Arrange
            var dayStart = BookingTestHelpers.DayN(4);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            var gen = new BookingTokenGenerator(db);

            var rules = BookingTestHelpers.BuildRulesForDay(
                targetDow, 9, 11,
                slotMinutes: 30,
                bufferMinutes: 10,
                minAdvanceHours: 1,
                maxAdvanceDays: 10);

            // Block exactly first slot 09:00–09:30; buffer expands to 08:50–09:40
            rules.BlockedPeriods.Add(new BookingRuleBlockedPeriod
            {
                Id = Guid.NewGuid(),
                BookingRulesId = rules.Id,
                StartDateTimeUtc = dayStart.AddHours(9),
                EndDateTimeUtc = dayStart.AddHours(9).AddMinutes(30)
            });

            // Act
            var tokens = await gen.GenerateBookingTokensAsync(service, rules);

            // Assert: 09:30 start would "touch" but should be blocked by expansion
            tokens.Where(t => t.StartTimeUtc.Date == dayStart)
                  .Select(t => t.StartTimeUtc.TimeOfDay)
                  .Should().NotContain(TimeSpan.FromHours(9) + TimeSpan.FromMinutes(30));
        }

        [Fact]
        public async Task TouchingEdges_Allowed_WhenBufferZero()
        {
            // Arrange
            var dayStart = BookingTestHelpers.DayN(4);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            var gen = new BookingTokenGenerator(db);

            var rules = BookingTestHelpers.BuildRulesForDay(
                targetDow, 9, 11,
                slotMinutes: 30,
                bufferMinutes: 0,
                minAdvanceHours: 1,
                maxAdvanceDays: 10);

            rules.BlockedPeriods.Add(new BookingRuleBlockedPeriod
            {
                Id = Guid.NewGuid(),
                BookingRulesId = rules.Id,
                StartDateTimeUtc = dayStart.AddHours(9),
                EndDateTimeUtc = dayStart.AddHours(9).AddMinutes(30)
            });

            // Act
            var tokens = await gen.GenerateBookingTokensAsync(service, rules);

            // Assert: touching at 09:30 is fine when buffer == 0
            tokens.Where(t => t.StartTimeUtc.Date == dayStart)
                  .Select(t => t.StartTimeUtc.TimeOfDay)
                  .Should().Contain(TimeSpan.FromHours(9) + TimeSpan.FromMinutes(30));
        }

        [Fact]
        public async Task Ignores_BlockedPeriods_OutsideGlobalWindow()
        {
            // Arrange: global window ~ [now+1h, now+10d]; block far outside it
            var dayStart = BookingTestHelpers.DayN(2);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);

            // Block on a day well past MaxAdvance (unrelated to global window)
            rules.BlockedPeriods.Add(new BookingRuleBlockedPeriod
            {
                Id = Guid.NewGuid(),
                BookingRulesId = rules.Id,
                StartDateTimeUtc = dayStart.AddDays(20).AddHours(10),
                EndDateTimeUtc = dayStart.AddDays(20).AddHours(11),
                Description = "Outside window"
            });

            var gen = new BookingTokenGenerator(db);

            // Act
            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            // 11:40 is not expected (would end after close). Expect: 09:00, 09:40, 10:20, 11:00
            starts.Should().Equal(
                TimeSpan.FromHours(9),
                TimeSpan.FromHours(9) + TimeSpan.FromMinutes(40),
                TimeSpan.FromHours(10) + TimeSpan.FromMinutes(20),
                TimeSpan.FromHours(11));
        }

        [Fact]
        public async Task Blocks_Slot_ThatIsOnlyHit_ByBufferExpansion()
        {
            // Block 10:30–10:31 with buffer 15 → expanded 10:15–10:46; 10:20 slot now blocked.
            var dayStart = BookingTestHelpers.DayN(3);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 9, 12, slotMinutes: 30, bufferMinutes: 15, minAdvanceHours: 1, maxAdvanceDays: 10);

            rules.BlockedPeriods.Add(new BookingRuleBlockedPeriod
            {
                Id = Guid.NewGuid(),
                BookingRulesId = rules.Id,
                StartDateTimeUtc = dayStart.AddHours(10).AddMinutes(30),
                EndDateTimeUtc = dayStart.AddHours(10).AddMinutes(31)
            });

            var gen = new BookingTokenGenerator(db);

            var times = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            times.Should().Contain(TimeSpan.FromHours(9)); // still there
            times.Should().NotContain(TimeSpan.FromHours(10) + TimeSpan.FromMinutes(20)); // blocked by expansion
            times.Should().Contain(TimeSpan.FromHours(11) + TimeSpan.FromMinutes(15)); // next step with 45m stride
        }

        [Fact]
        public async Task Overlapping_BlockedPeriods_CombineEffectively()
        {
            // A: 10:00–10:20 (±10) → 09:50–10:30
            // B: 10:25–10:40 (±10) → 10:15–10:50
            // Combined expansion covers 09:50–10:50 → blocks 10:20 as well.
            var dayStart = BookingTestHelpers.DayN(2);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);

            rules.BlockedPeriods.AddRange(new[]
            {
        new BookingRuleBlockedPeriod
        {
            Id = Guid.NewGuid(),
            BookingRulesId = rules.Id,
            StartDateTimeUtc = dayStart.AddHours(10),
            EndDateTimeUtc = dayStart.AddHours(10).AddMinutes(20)
        },
        new BookingRuleBlockedPeriod
        {
            Id = Guid.NewGuid(),
            BookingRulesId = rules.Id,
            StartDateTimeUtc = dayStart.AddHours(10).AddMinutes(25),
            EndDateTimeUtc = dayStart.AddHours(10).AddMinutes(40)
        }
    });

            var gen = new BookingTokenGenerator(db);

            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            // 09:00, 09:40 blocked by A’s expansion to 10:00? (09:40 is < 10:00 so yes)
            // 10:20 blocked by combined expansions to 10:50
            // left: 11:00 (11:40 would end after close → excluded by generator)
            starts.Should().Equal(TimeSpan.FromHours(9), TimeSpan.FromHours(11));
        }

        [Fact]
        public async Task BlockAtOpen_RemovesFirstSlot_LeavesNext_WhenBufferZero()
        {
            // Open 09:00–12:00, slot=30, buffer=0 ⇒ starts: 09:00,09:30,10:00,10:30,11:00,11:30
            // Block 09:00–09:30 ⇒ remove 09:00 only; 09:30 stays.
            var dayStart = BookingTestHelpers.DayN(2);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 9, 12, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);

            rules.BlockedPeriods.Add(new BookingRuleBlockedPeriod
            {
                Id = Guid.NewGuid(),
                BookingRulesId = rules.Id,
                StartDateTimeUtc = dayStart.AddHours(9),
                EndDateTimeUtc = dayStart.AddHours(9).AddMinutes(30)
            });

            var gen = new BookingTokenGenerator(db);

            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            starts.Should().NotContain(TimeSpan.FromHours(9));
            starts.Should().Contain(TimeSpan.FromHours(9) + TimeSpan.FromMinutes(30));
            starts.Should().Contain(TimeSpan.FromHours(11) + TimeSpan.FromMinutes(30)); // ends exactly at close, allowed
        }

        [Fact]
        public async Task ExpandedBlock_CanWipeEntireOpeningWindow()
        {
            // Open 09:00–12:00, slot=30, buffer=10 (step 40)
            // Block 09:05–11:50 → expanded 08:55–12:00 → every candidate overlaps
            var dayStart = BookingTestHelpers.DayN(2);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);

            rules.BlockedPeriods.Add(new BookingRuleBlockedPeriod
            {
                Id = Guid.NewGuid(),
                BookingRulesId = rules.Id,
                StartDateTimeUtc = dayStart.AddHours(9).AddMinutes(5),
                EndDateTimeUtc = dayStart.AddHours(11).AddMinutes(50)
            });

            var gen = new BookingTokenGenerator(db);

            var tokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .ToList();

            tokens.Should().BeEmpty();
        }
    }
}