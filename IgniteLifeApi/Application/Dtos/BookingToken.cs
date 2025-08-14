namespace IgniteLifeApi.Application.Dtos
{
    public record BookingToken
    {
        public Guid ServiceId { get; init; }
        public DateTime StartTimeUtc { get; init; }
        public DateTime EndTimeUtc { get; init; }

        private BookingToken(Guid serviceId, DateTime startTimeUtc, DateTime endTimeUtc)
        {
            ServiceId = serviceId;
            StartTimeUtc = startTimeUtc;
            EndTimeUtc = endTimeUtc;
        }

        public static BookingToken Create(Guid serviceId, DateTime startTimeUtc, DateTime endTimeUtc) =>
            new BookingToken(serviceId, startTimeUtc, endTimeUtc);
    }
}
