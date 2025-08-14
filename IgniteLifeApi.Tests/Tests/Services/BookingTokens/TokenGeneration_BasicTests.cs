using FluentAssertions;
using IgniteLifeApi.Domain.Entities;

namespace IgniteLifeApi.Tests.Tests.Services.BookingTokens
{
    public class TokenGeneration_BasicTests
    {
        [Fact]
        public async Task GeneratesSlots_WithinOpeningHours_AndWindow()
        {
            // Arrange
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                targetDow,
                openHourUtc: 9,   // 09:00–12:00
                closeHourUtc: 12,
                slotMinutes: 30,
                bufferMinutes: 10,
                minAdvanceHours: 1,
                maxAdvanceDays: 10);

            var gen = new BookingTokenGenerator(db);

            // Act
            var tokens = await gen.GenerateBookingTokensAsync(service, rules);

            // Assert (expect starts at: 09:00, 09:40, 10:20, 11:00, 11:40)
            var starts = tokens.Where(t => t.StartTimeUtc.Date == dayStart)
                               .OrderBy(t => t.StartTimeUtc)
                               .Select(t => t.StartTimeUtc.TimeOfDay)
                               .ToList();

            starts.Should().NotBeEmpty();
            starts.Should().ContainInOrder(
                new[]
                {
                TimeSpan.FromHours(9),
                TimeSpan.FromHours(9) + TimeSpan.FromMinutes(40),
                TimeSpan.FromHours(10) + TimeSpan.FromMinutes(20),
                TimeSpan.FromHours(11),
                });

            // ensure stepping = slot + buffer = 40 mins
            for (int i = 1; i < starts.Count; i++)
                (starts[i] - starts[i - 1]).Should().Be(TimeSpan.FromMinutes(40));
        }

        [Fact]
        public async Task IncludesSlot_ThatEndsExactlyAtClose()
        {
            // Window 09:00–10:30, slot=45, buffer=0 → starts: 09:00, 09:45 (09:45+45=10:30 allowed)
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                targetDow, 9, 10, slotMinutes: 45, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);
            // Adjust close to 10:30
            rules.OpeningHours[0].CloseTimeUtc = new TimeOnly(10, 30);

            var gen = new BookingTokenGenerator(db);
            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            starts.Should().Equal(
                TimeSpan.FromHours(9),
                TimeSpan.FromHours(9) + TimeSpan.FromMinutes(45));
        }

        [Fact]
        public async Task ExcludesSlot_ThatWouldEndAfterClose()
        {
            // Window 09:00–10:29, slot=45, buffer=0 → only 09:00 (09:45 would end 10:30 > 10:29)
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                targetDow, 9, 10, slotMinutes: 45, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);
            rules.OpeningHours[0].CloseTimeUtc = new TimeOnly(10, 29);

            var gen = new BookingTokenGenerator(db);
            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            starts.Should().Equal(TimeSpan.FromHours(9));
        }

        [Fact]
        public async Task NoSlots_WhenSlotDoesNotFitWindow()
        {
            // Window 09:00–09:20, slot=30 → none
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(
                targetDow, 9, 9, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);
            rules.OpeningHours[0].CloseTimeUtc = new TimeOnly(9, 20);

            var gen = new BookingTokenGenerator(db);
            var tokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .ToList();

            tokens.Should().BeEmpty();
        }

        [Fact]
        public async Task GeneratesAcross_MultipleOpeningWindows_SameDay()
        {
            // Two windows on same day: 09:00–10:00 and 11:00–12:00, slot=30, buffer=0
            // Expected: 09:00, 09:30, 11:00, 11:30
            var dayStart = BookingTestHelpers.DayN(2);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(dow, 9, 10, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);
            rules.OpeningHours.Add(new BookingRuleOpeningHour
            {
                Id = Guid.NewGuid(),
                DayOfWeek = dow,
                IsClosed = false,
                OpenTimeUtc = new TimeOnly(11, 0),
                CloseTimeUtc = new TimeOnly(12, 0),
                BookingRulesId = rules.Id
            });

            var gen = new BookingTokenGenerator(db);
            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            starts.Should().Equal(
                TimeSpan.FromHours(9),
                TimeSpan.FromHours(9) + TimeSpan.FromMinutes(30),
                TimeSpan.FromHours(11),
                TimeSpan.FromHours(11) + TimeSpan.FromMinutes(30));
        }

        [Fact]
        public async Task GeneratesAcross_MultipleDays_WhenDefined()
        {
            // Provide opening hours for two consecutive days; ensure tokens appear on both.
            var day1 = BookingTestHelpers.DayN(2);
            var dow1 = day1.DayOfWeek;
            var day2 = day1.AddDays(1);
            var dow2 = day2.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            var rules = BookingTestHelpers.BuildRulesForDay(dow1, 9, 10, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);
            rules.OpeningHours.Add(new BookingRuleOpeningHour
            {
                Id = Guid.NewGuid(),
                DayOfWeek = dow2,
                IsClosed = false,
                OpenTimeUtc = new TimeOnly(14, 0),
                CloseTimeUtc = new TimeOnly(15, 0),
                BookingRulesId = rules.Id
            });

            var gen = new BookingTokenGenerator(db);
            var tokens = await gen.GenerateBookingTokensAsync(service, rules);

            var day1Starts = tokens.Where(t => t.StartTimeUtc.Date == day1).Select(t => t.StartTimeUtc.TimeOfDay).ToList();
            var day2Starts = tokens.Where(t => t.StartTimeUtc.Date == day2).Select(t => t.StartTimeUtc.TimeOfDay).ToList();

            day1Starts.Should().Equal(TimeSpan.FromHours(9), TimeSpan.FromHours(9) + TimeSpan.FromMinutes(30));
            day2Starts.Should().Equal(TimeSpan.FromHours(14), TimeSpan.FromHours(14) + TimeSpan.FromMinutes(30));
        }

        [Fact]
        public async Task AllTokens_Respect_MinAdvance_And_MaxAdvance()
        {
            // Wide opening so only the global window limits matter.
            // MinAdvance=30h; MaxAdvance=2d
            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();

            // Choose day ~1 day out so the min-advance likely falls inside that day
            var dayStart = BookingTestHelpers.DayN(1);
            var dow = dayStart.DayOfWeek;

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow,
                openHourUtc: 8,
                closeHourUtc: 20,
                slotMinutes: 60,
                bufferMinutes: 15,
                minAdvanceHours: 30,
                maxAdvanceDays: 2);

            var gen = new BookingTokenGenerator(db);
            var now = DateTime.UtcNow;

            var tokens = await gen.GenerateBookingTokensAsync(service, rules);

            tokens.Should().NotBeEmpty(); // sanity
            tokens.Should().OnlyContain(t => t.StartTimeUtc >= now.AddHours(30));
            tokens.Should().OnlyContain(t => t.EndTimeUtc <= now.AddDays(2));
        }

        [Fact]
        public async Task LargeBuffer_SkipsMultipleCandidateSlots_AfterBooking()
        {
            // Arrange
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            await db.BowenServices.AddAsync(service);

            // Existing booking 09:00–10:00
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

            // Opening hours: 09:00–12:00
            // Slot length: 15 mins, buffer: 30 mins
            var rules = BookingTestHelpers.BuildRulesForDay(
                targetDow,
                openHourUtc: 9,
                closeHourUtc: 12,
                slotMinutes: 15,
                bufferMinutes: 30,
                minAdvanceHours: 1,
                maxAdvanceDays: 10);

            var gen = new BookingTokenGenerator(db);

            // Act
            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            // Assert
            // 09:00–10:00 booking + 30m buffer → first free = 10:30
            starts.Should().NotContain(TimeSpan.FromHours(10));   // 10:00 start blocked
            starts.Should().Contain(TimeSpan.FromHours(10) + TimeSpan.FromMinutes(30)); // allowed
            starts.First().Should().Be(TimeSpan.FromHours(10) + TimeSpan.FromMinutes(30));
        }

    }
}