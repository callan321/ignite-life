using IgniteLifeApi.Application.Dtos.Common;
using IgniteLifeApi.Application.Services.Common;
using IgniteLifeApi.Domain.Entities;
using IgniteLifeApi.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace IgniteLifeApi.Application.Services.Implementations
{
    public class BookingClientService
    {
        private readonly ApplicationDbContext _dbContext;
        public BookingClientService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // ---------- Public Methods ----------

        public async Task<ServiceResult<List<BowenService>>> GetAllBowenServicesAsync(CancellationToken cancellationToken = default)
        {
            var services = await _dbContext.BowenServices
                .Where(s => s.IsActive)
                .ToListAsync(cancellationToken);

            if (services == null || services.Count == 0)
                return ServiceResult<List<BowenService>>.NotFound("No active Bowen services found.");

            return ServiceResult<List<BowenService>>.SuccessResult(services);
        }
    }
}