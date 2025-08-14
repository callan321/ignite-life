using FluentAssertions;
using IgniteLifeApi.Domain.Entities;

namespace IgniteLifeApi.Tests.Tests.Services.BookingTokens
{
    public class TokenGeneration_ActiveSessionsTests
    {
        [Fact]
        public async Task SkipsSlots_ThatOverlap_ActiveBookingSessions()
        {
            // Arrange
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            await db.BowenServices.AddAsync(service);

            // Active session overlapping 09:40–10:10
            await db.BookingSessions.AddAsync(new BookingSession
            {
                Id = Guid.NewGuid(),
                ServiceId = service.Id,
                Service = service,
                IsActive = true,
                StartTimeUtc = dayStart.AddHours(9).AddMinutes(40),
                EndTimeUtc = dayStart.AddHours(10).AddMinutes(10),
                MaxCapacity = 1,
                ReservedCount = 0
            });
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(
                targetDow, 9, 12,
                slotMinutes: 30,
                bufferMinutes: 10,
                minAdvanceHours: 1,
                maxAdvanceDays: 10);

            var gen = new BookingTokenGenerator(db);

            // Act
            var tokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .ToList();

            // Assert: 09:00 kept; 09:40 removed; 10:20 allowed (touches expandedEnd at 10:20 so no conflict)
            tokens.Select(t => t.StartTimeUtc.TimeOfDay).Should().Contain(TimeSpan.FromHours(9));
            tokens.Select(t => t.StartTimeUtc.TimeOfDay).Should().NotContain(TimeSpan.FromHours(9) + TimeSpan.FromMinutes(40));
            tokens.Select(t => t.StartTimeUtc.TimeOfDay).Should().Contain(TimeSpan.FromHours(10) + TimeSpan.FromMinutes(20));
        }

        [Fact]
        public async Task Ignores_InactiveSessions()
        {
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            await db.BowenServices.AddAsync(service);

            // Same times as above but IsActive = false
            await db.BookingSessions.AddAsync(new BookingSession
            {
                Id = Guid.NewGuid(),
                ServiceId = service.Id,
                Service = service,
                IsActive = false,
                StartTimeUtc = dayStart.AddHours(9).AddMinutes(40),
                EndTimeUtc = dayStart.AddHours(10).AddMinutes(10),
                MaxCapacity = 1,
                ReservedCount = 0
            });
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(targetDow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);
            var gen = new BookingTokenGenerator(db);

            var tokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .ToList();

            // Expect default timeline with no blocking: 09:00, 09:40, 10:20, 11:00, 11:40
            tokens.Select(t => t.StartTimeUtc.TimeOfDay).Should().Contain(new[]
            {
            TimeSpan.FromHours(9),
            TimeSpan.FromHours(9) + TimeSpan.FromMinutes(40)
        });
        }

        [Fact]
        public async Task Ignores_Sessions_ForOtherServices()
        {
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            var other = BookingTestHelpers.BuildService();
            await db.BowenServices.AddRangeAsync(service, other);

            // Session belongs to a different service
            await db.BookingSessions.AddAsync(new BookingSession
            {
                Id = Guid.NewGuid(),
                ServiceId = other.Id,
                Service = other,
                IsActive = true,
                StartTimeUtc = dayStart.AddHours(9).AddMinutes(40),
                EndTimeUtc = dayStart.AddHours(10).AddMinutes(10),
                MaxCapacity = 1,
                ReservedCount = 0
            });
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(targetDow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);
            var gen = new BookingTokenGenerator(db);

            var tokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .ToList();

            // Unaffected
            tokens.Select(t => t.StartTimeUtc.TimeOfDay).Should().Contain(new[]
            {
            TimeSpan.FromHours(9) + TimeSpan.FromMinutes(40),
            TimeSpan.FromHours(10) + TimeSpan.FromMinutes(20)
        });
        }

        [Fact]
        public async Task Blocks_Slot_ThatEnds_WithinBufferBefore_SessionStart()
        {
            // Slot 09:00–09:30; session 09:35–10:00; buffer 10 → expandedStart 09:25
            // 09:00 slot overlaps expanded range (ends 09:30 > 09:25) → should be blocked.
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            await db.BowenServices.AddAsync(service);

            await db.BookingSessions.AddAsync(new BookingSession
            {
                Id = Guid.NewGuid(),
                ServiceId = service.Id,
                Service = service,
                IsActive = true,
                StartTimeUtc = dayStart.AddHours(9).AddMinutes(35),
                EndTimeUtc = dayStart.AddHours(10),
                MaxCapacity = 1,
                ReservedCount = 0
            });
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(targetDow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);
            var gen = new BookingTokenGenerator(db);

            var times = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            times.Should().NotContain(TimeSpan.FromHours(9));                              // 09:00 blocked
            times.Should().NotContain(TimeSpan.FromHours(9) + TimeSpan.FromMinutes(40));   // 09:40 overlaps session directly
            times.Should().Contain(TimeSpan.FromHours(10) + TimeSpan.FromMinutes(20));     // 10:20 allowed (touches expandedEnd 10:10+10=10:20)
        }

        [Fact]
        public async Task Blocks_Slot_ThatStarts_WithinBufferAfter_SessionEnd()
        {
            // Session ends 10:15; buffer 10 → expandedEnd 10:25; slot 10:20–10:50 starts within buffer → blocked.
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            await db.BowenServices.AddAsync(service);

            await db.BookingSessions.AddAsync(new BookingSession
            {
                Id = Guid.NewGuid(),
                ServiceId = service.Id,
                Service = service,
                IsActive = true,
                StartTimeUtc = dayStart.AddHours(9).AddMinutes(40),
                EndTimeUtc = dayStart.AddHours(10).AddMinutes(15),
                MaxCapacity = 1,
                ReservedCount = 0
            });
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(targetDow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);
            var gen = new BookingTokenGenerator(db);

            var times = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            times.Should().NotContain(TimeSpan.FromHours(10) + TimeSpan.FromMinutes(20)); // blocked by post-session buffer
            times.Should().Contain(TimeSpan.FromHours(11));                                // next valid start
        }

        [Fact]
        public async Task Session_OutsideOpeningHours_DoesNotAffectTokens()
        {
            // Session 06:00–07:00 while opening is 09:00–12:00 → should not block any slots.
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            await db.BowenServices.AddAsync(service);

            await db.BookingSessions.AddAsync(new BookingSession
            {
                Id = Guid.NewGuid(),
                ServiceId = service.Id,
                Service = service,
                IsActive = true,
                StartTimeUtc = dayStart.AddHours(6),
                EndTimeUtc = dayStart.AddHours(7),
                MaxCapacity = 1,
                ReservedCount = 0
            });
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(targetDow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);
            var gen = new BookingTokenGenerator(db);

            var times = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            times.Should().Contain(new[]
            {
            TimeSpan.FromHours(9),
            TimeSpan.FromHours(9) + TimeSpan.FromMinutes(40),
            TimeSpan.FromHours(10) + TimeSpan.FromMinutes(20)
        });
        }

        [Fact]
        public async Task PartialOverlap_AtOpeningBoundary_BlocksFirstSlotOnly()
        {
            // Session 08:50–09:05; buffer 10 → expanded 08:40–09:15
            // 09:00 slot blocked; 09:40 allowed.
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            await db.BowenServices.AddAsync(service);

            await db.BookingSessions.AddAsync(new BookingSession
            {
                Id = Guid.NewGuid(),
                ServiceId = service.Id,
                Service = service,
                IsActive = true,
                StartTimeUtc = dayStart.AddHours(8).AddMinutes(50),
                EndTimeUtc = dayStart.AddHours(9).AddMinutes(5),
                MaxCapacity = 1,
                ReservedCount = 0
            });
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(targetDow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);
            var gen = new BookingTokenGenerator(db);

            var times = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            times.Should().NotContain(TimeSpan.FromHours(9));
            times.Should().Contain(TimeSpan.FromHours(9) + TimeSpan.FromMinutes(40));
        }

        [Fact]
        public async Task MultipleSessions_BlockMultipleSlots_Correctly()
        {
            // Two sessions on the same morning:
            // A) 09:10–09:50 (buffer 10) → expanded 09:00–10:00
            // B) 10:35–10:50 (buffer 10) → expanded 10:25–11:00
            // Candidates: 09:00, 09:40, 10:20, 11:00, 11:40
            // Blocked: 09:00, 09:40 (by A), 10:20 (overlaps B’s expanded start) → left: 11:00, 11:40.
            var dayStart = BookingTestHelpers.DayN(2);
            var targetDow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            await db.BowenServices.AddAsync(service);

            await db.BookingSessions.AddRangeAsync(
                new BookingSession
                {
                    Id = Guid.NewGuid(),
                    ServiceId = service.Id,
                    Service = service,
                    IsActive = true,
                    StartTimeUtc = dayStart.AddHours(9).AddMinutes(10),
                    EndTimeUtc = dayStart.AddHours(9).AddMinutes(50),
                    MaxCapacity = 1,
                    ReservedCount = 0
                },
                new BookingSession
                {
                    Id = Guid.NewGuid(),
                    ServiceId = service.Id,
                    Service = service,
                    IsActive = true,
                    StartTimeUtc = dayStart.AddHours(10).AddMinutes(35),
                    EndTimeUtc = dayStart.AddHours(10).AddMinutes(50),
                    MaxCapacity = 1,
                    ReservedCount = 0
                }
            );
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(targetDow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);
            var gen = new BookingTokenGenerator(db);

            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            starts.Should().Equal(
                TimeSpan.FromHours(11)
            );
        }

        [Fact]
        public async Task FragmentedGap_SmallerThanSlot_ProducesNoTokenInGap()
        {
            // Opening 09:00–12:00, slot=30, buffer=0 → candidate starts: 09:00, 09:30, 10:00, 10:30, 11:00, 11:30
            // Bookings: 09:00–09:20 and 09:40–10:00 → leaves a 20-min gap (09:20–09:40) < slot (30)
            // The 09:30 candidate sits in that gap but ends at 10:00, which overlaps the second booking → should be blocked.
            var dayStart = BookingTestHelpers.DayN(2);
            var dow = dayStart.DayOfWeek;

            using var db = BookingTestHelpers.NewDb();
            var service = BookingTestHelpers.BuildService();
            await db.BowenServices.AddAsync(service);

            await db.BookingSessions.AddRangeAsync(
                new BookingSession
                {
                    Id = Guid.NewGuid(),
                    ServiceId = service.Id,
                    Service = service,
                    IsActive = true,
                    StartTimeUtc = dayStart.AddHours(9),
                    EndTimeUtc = dayStart.AddHours(9).AddMinutes(20),
                    MaxCapacity = 1,
                    ReservedCount = 0
                },
                new BookingSession
                {
                    Id = Guid.NewGuid(),
                    ServiceId = service.Id,
                    Service = service,
                    IsActive = true,
                    StartTimeUtc = dayStart.AddHours(9).AddMinutes(40),
                    EndTimeUtc = dayStart.AddHours(10),
                    MaxCapacity = 1,
                    ReservedCount = 0
                }
            );
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 9, 12, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);

            var gen = new BookingTokenGenerator(db);

            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            // 09:00 blocked by first booking; 09:30 overlaps second booking (ends 10:00);
            // first safe start is 10:30 (then 11:00, 11:30 if they fit).
            starts.Should().NotContain(TimeSpan.FromHours(9));
            starts.Should().NotContain(TimeSpan.FromHours(9) + TimeSpan.FromMinutes(30));
            starts.Should().Contain(TimeSpan.FromHours(10) + TimeSpan.FromMinutes(30));
        }

        [Fact]
        public async Task BookingFillsOpening_NoTokens()
        {
            // Booking 09:00–12:00 fully occupies the open window → zero tokens.
            var dayStart = BookingTestHelpers.DayN(2);
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
                EndTimeUtc = dayStart.AddHours(12),
                MaxCapacity = 1,
                ReservedCount = 0
            });
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 9, 12, slotMinutes: 30, bufferMinutes: 10, minAdvanceHours: 1, maxAdvanceDays: 10);

            var gen = new BookingTokenGenerator(db);
            var tokens = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .ToList();

            tokens.Should().BeEmpty();
        }

        [Fact]
        public async Task BookingExtendsPastClose_BlocksLastCandidateStart()
        {
            // Opening 09:00–12:00, slot=30, buffer=0 → last candidate is 11:30–12:00.
            // A booking from 11:40–12:20 (past close) should STILL block the 11:30–12:00 token.
            var dayStart = BookingTestHelpers.DayN(2);
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
                StartTimeUtc = dayStart.AddHours(11).AddMinutes(40),
                EndTimeUtc = dayStart.AddHours(12).AddMinutes(20),
                MaxCapacity = 1,
                ReservedCount = 0
            });
            await db.SaveChangesAsync();

            var rules = BookingTestHelpers.BuildRulesForDay(
                dow, 9, 12, slotMinutes: 30, bufferMinutes: 0, minAdvanceHours: 1, maxAdvanceDays: 10);

            var gen = new BookingTokenGenerator(db);

            var starts = (await gen.GenerateBookingTokensAsync(service, rules))
                .Where(t => t.StartTimeUtc.Date == dayStart)
                .OrderBy(t => t.StartTimeUtc)
                .Select(t => t.StartTimeUtc.TimeOfDay)
                .ToList();

            // 11:30–12:00 overlaps the booking → must be removed
            starts.Should().NotContain(TimeSpan.FromHours(11) + TimeSpan.FromMinutes(30));
        }
    }
}