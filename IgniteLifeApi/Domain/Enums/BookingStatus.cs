namespace IgniteLifeApi.Domain.Enums
{
    public enum BookingStatus
    {
        // User has started booking but has not confirmed/payment not done
        Pending = 0,
        // Booking has been confirmed by system or admin
        Confirmed = 1,
        // Service has been completed
        Completed = 2,
        // Booking was cancelled before completion
        Cancelled = 3,
        // User did not show up
        NoShow = 4
    }
}
