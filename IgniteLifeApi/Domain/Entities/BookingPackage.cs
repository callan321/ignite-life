using IgniteLifeApi.Domain.Entities.Common;

namespace IgniteLifeApi.Domain.Entities
{
    public class BookingPackage : BaseEntity
    {
        public Guid ServiceId { get; set; }
        public BowenService Service { get; set; } = default!;

        public Guid? UserId { get; set; }
        public ApplicationUser? User { get; set; }

        public int TotalSessions { get; set; }
        public int CompletedSessions { get; set; }
        public decimal TotalPrice { get; set; }

        public List<BookingReservation> Reservations { get; set; } = [];
    }

}
