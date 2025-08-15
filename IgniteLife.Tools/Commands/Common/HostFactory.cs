using IgniteLifeApi.Domain.Entities;
using IgniteLifeApi.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace IgniteLife.Tools.Commands.Common;

public static class HostFactory
{
    public static IHost Create(string envName, bool includeIdentity)
    {
        var apiDir = ResolveApiDir();

        // Build a host whose ContentRoot is the API project directory,
        // so we read the SAME appsettings the API uses.
        var builder = Host.CreateApplicationBuilder(new HostApplicationBuilderSettings
        {
            ContentRootPath = apiDir,
            EnvironmentName = envName
        });

        // Load API config (base + environment) + env vars
        builder.Configuration
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: false)
            .AddJsonFile($"appsettings.{envName}.json", optional: true, reloadOnChange: false)
            .AddEnvironmentVariables();

        // Connection string exactly like API expects
        var conn = builder.Configuration.GetConnectionString("DefaultConnection")
                  ?? builder.Configuration["ConnectionStrings__DefaultConnection"]
                  ?? throw new InvalidOperationException(
                         "Connection string 'DefaultConnection' not found in API appsettings or env vars.");

        // Use the same provider the API uses (Postgres here)
        builder.Services.AddDbContext<ApplicationDbContext>(opt =>
        {
            opt.UseNpgsql(conn);
        });

        if (includeIdentity)
        {
            builder.Services
                .AddIdentityCore<ApplicationUser>()
                .AddRoles<IdentityRole<Guid>>()
                .AddEntityFrameworkStores<ApplicationDbContext>();
        }

        return builder.Build();
    }

    private static string ResolveApiDir()
    {
        // 1) explicit override
        var fromEnv = Environment.GetEnvironmentVariable("IGNITE_API_DIR");
        if (!string.IsNullOrWhiteSpace(fromEnv) && Directory.Exists(fromEnv))
            return fromEnv;

        // 2) common dev layout: repo root / IgniteLifeApi
        // Try from current working directory
        var tryCwd = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "IgniteLifeApi"));
        if (Directory.Exists(tryCwd)) return tryCwd;

        // Try relative to the tool's binaries (bin/.../netX)
        var baseDir = AppContext.BaseDirectory;
        var tryFromBin = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "..", "IgniteLifeApi"));
        if (Directory.Exists(tryFromBin)) return tryFromBin;

        throw new InvalidOperationException(
            "Could not locate the IgniteLifeApi directory. " +
            "Set IGNITE_API_DIR to your API project path, or run the tool from the repo root.");
    }
}
