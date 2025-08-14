using IgniteLifeApi.Domain.Entities.Common;

namespace IgniteLifeApi.Domain.Entities
{
    public class BookingSession : BaseEntity
    {
        public Guid ServiceId { get; set; }
        public BowenService Service { get; set; } = default!;

        public DateTime StartTimeUtc { get; set; }
        public DateTime EndTimeUtc { get; set; }

        public int MaxCapacity { get; set; }
        public int ReservedCount { get; set; }

        public bool IsActive { get; set; } = true;

        public List<BookingReservation> Reservations { get; set; } = [];
    }
}
