using IgniteLifeApi.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IgniteLifeApi.Infrastructure.Data.Configurations
{
    public class BookingReservationConfiguration : IEntityTypeConfiguration<BookingReservation>
    {
        public void Configure(EntityTypeBuilder<BookingReservation> builder)
        {
            builder.ToTable("booking_reservations");

            builder.HasKey(r => r.Id);

            builder.Property(r => r.Status)
                   .IsRequired()
                   .HasConversion<int>();

            builder.Property(r => r.PriceAtBooking)
                   .IsRequired()
                   .HasColumnType("decimal(10,2)");

            builder.Property(r => r.GroupSize)
                   .IsRequired();

            builder.Property(r => r.Notes)
                   .HasMaxLength(500);

            // Relationships
            builder.HasOne(r => r.Session)
                   .WithMany(s => s.Reservations)
                   .HasForeignKey(r => r.SessionId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(r => r.User)
                   .WithMany()
                   .HasForeignKey(r => r.UserId)
                   .OnDelete(DeleteBehavior.SetNull);

            builder.Property(r => r.CreatedAtUtc)
                   .HasColumnType("timestamptz");

            builder.Property(r => r.UpdatedAtUtc)
                   .HasColumnType("timestamptz");
        }
    }
}
