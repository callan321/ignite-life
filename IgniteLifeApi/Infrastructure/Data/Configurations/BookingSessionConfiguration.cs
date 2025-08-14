using IgniteLifeApi.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IgniteLifeApi.Infrastructure.Data.Configurations
{
    public class BookingSessionConfiguration : IEntityTypeConfiguration<BookingSession>
    {
        public void Configure(EntityTypeBuilder<BookingSession> builder)
        {
            builder.ToTable("booking_sessions");

            builder.HasKey(s => s.Id);

            builder.Property(s => s.StartTimeUtc)
                   .IsRequired()
                   .HasColumnType("timestamptz");

            builder.Property(s => s.EndTimeUtc)
                   .IsRequired()
                   .HasColumnType("timestamptz");

            builder.Property(s => s.MaxCapacity)
                   .IsRequired();

            builder.Property(s => s.ReservedCount)
                   .IsRequired();

            // Relationships
            builder.HasOne(s => s.Service)
                   .WithMany()
                   .HasForeignKey(s => s.ServiceId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(s => s.Reservations)
                   .WithOne(r => r.Session)
                   .HasForeignKey(r => r.SessionId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Property(s => s.CreatedAtUtc)
                   .HasColumnType("timestamptz");

            builder.Property(s => s.UpdatedAtUtc)
                   .HasColumnType("timestamptz");
        }
    }
}
