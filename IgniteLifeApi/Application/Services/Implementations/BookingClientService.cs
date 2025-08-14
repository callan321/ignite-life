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
        private readonly BookingTokenGenerator _TokenGenerator;
        private readonly BookingRuleService _BookingRuleService;
        private readonly BowenServiceService _BowenService;
        public BookingClientService(ApplicationDbContext dbContext, BookingTokenGenerator generator, BookingRuleService bookingRuleService, BowenServiceService bowenService)
        {
            _dbContext = dbContext;
            _TokenGenerator = generator;
            _BookingRuleService = bookingRuleService;
            _BowenService = bowenService;
        }

        // ---------- Public Methods ----------

        // 1 Get all active Bowen services
        public async Task<ServiceResult<List<BowenService>>> GetAllBowenServicesAsync(CancellationToken cancellationToken = default)
        {
            var services = await _dbContext.BowenServices
                .Where(s => s.IsActive)
                .ToListAsync(cancellationToken);

            if (services == null || services.Count == 0)
                return ServiceResult<List<BowenService>>.NotFound("No active Bowen services found.");

            return ServiceResult<List<BowenService>>.SuccessResult(services);
        }

        // 2 
        public async Task<ServiceResult<List<BowenService>>> GetBookingTokensAsync(Guid id, CancellationToken cancellationToken = default)
        {
            // find service by id

            var rules = await _BookingRuleService.GetSingletonRulesAsync(cancellationToken);
            var service = await _BowenService.GetBowenServiceByIdAsync(id, cancellationToken);
            var tokens = await _TokenGenerator.GenerateBookingTokensAsync(service, rules, cancellationToken);
        }
    }
}