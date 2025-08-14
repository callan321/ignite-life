using IgniteLifeApi.Domain.Entities.Common;
using IgniteLifeApi.Domain.Enums;

namespace IgniteLifeApi.Domain.Entities
{
    public class BookingReservation : BaseEntity
    {
        public Guid SessionId { get; set; }
        public BookingSession Session { get; set; } = default!;

        public Guid? UserId { get; set; }
        public ApplicationUser? User { get; set; }

        public BookingStatus Status { get; set; } = BookingStatus.Pending;

        public decimal PriceAtBooking { get; set; }
        public int GroupSize { get; set; } = 1;

        public string? Notes { get; set; }

        public Guid? PackageId { get; set; }
        public BookingPackage? Package { get; set; }
    }
}
