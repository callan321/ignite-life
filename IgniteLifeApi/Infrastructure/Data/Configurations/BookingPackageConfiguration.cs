using IgniteLifeApi.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IgniteLifeApi.Infrastructure.Data.Configurations
{
    public class BookingPackageConfiguration : IEntityTypeConfiguration<BookingPackage>
    {
        public void Configure(EntityTypeBuilder<BookingPackage> builder)
        {

            builder.HasKey(p => p.Id);

            // Relationships
            builder.HasOne(p => p.Service)
                   .WithMany()
                   .HasForeignKey(p => p.ServiceId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(p => p.User)
                   .WithMany()
                   .HasForeignKey(p => p.UserId)
                   .OnDelete(DeleteBehavior.SetNull);

            builder.HasMany(p => p.Reservations)
                   .WithOne(r => r.Package)
                   .HasForeignKey(r => r.PackageId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Fields
            builder.Property(p => p.TotalSessions)
                   .IsRequired();

            builder.Property(p => p.CompletedSessions)
                   .IsRequired();

            builder.Property(p => p.TotalPrice)
                   .HasColumnType("decimal(10,2)")
                   .IsRequired();

            // Timestamps
            builder.Property(p => p.CreatedAtUtc)
                   .HasColumnType("timestamptz");

            builder.Property(p => p.UpdatedAtUtc)
                   .HasColumnType("timestamptz");
        }
    }
}
