using IgniteLife.Tools.Commands.Common;
using IgniteLifeApi.Domain.Entities;
using IgniteLifeApi.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace IgniteLife.Tools.Commands;

public sealed class SeedBookingRulesCommand : ICommand<SeedBookingRulesCommand>
{
    public static string Name => "seed-booking-rules";

    public static void WriteUsage()
        => Console.WriteLine("Usage: seed-booking-rules [--env <Environment=Development>]");

    public static async Task RunAsync(string[] args)
    {
        if (Cli.IsHelp(args)) { WriteUsage(); return; }

        var (envName, _) = Cli.SplitEnv(args, Environments.Development);

        using var host = HostFactory.Create(envName, includeIdentity: false);
        using var scope = host.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await db.Database.MigrateAsync();

        if (await db.BookingRules.AnyAsync())
        {
            Console.WriteLine("Booking rules already exist. Nothing to do.");
            Console.WriteLine($"Done. (Environment: {envName})");
            return;
        }

        var rules = new BookingRules();
        db.BookingRules.Add(rules);
        await db.SaveChangesAsync();

        var days = new[]
        {
            DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday,
            DayOfWeek.Thursday, DayOfWeek.Friday, DayOfWeek.Saturday, DayOfWeek.Sunday
        };

        foreach (var dow in days)
        {
            db.BookingRuleOpeningHours.Add(new BookingRuleOpeningHour
            {
                BookingRulesId = rules.Id,
                DayOfWeek = dow,
                OpenTimeUtc = new TimeOnly(9, 0),
                CloseTimeUtc = new TimeOnly(17, 0)
            });
        }

        db.BookingRuleBlockedPeriods.Add(new BookingRuleBlockedPeriod
        {
            BookingRulesId = rules.Id,
            StartDateTimeUtc = DateTime.UtcNow.Date.AddDays(7),
            EndDateTimeUtc = DateTime.UtcNow.Date.AddDays(8),
            Description = "Clinic closed (sample seed)"
        });

        await db.SaveChangesAsync();

        Console.WriteLine("Seeded booking rules with opening hours for all days.");
        Console.WriteLine($"Done. (Environment: {envName})");
    }
}
