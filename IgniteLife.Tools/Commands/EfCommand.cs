using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using IgniteLife.Tools.Commands.Common;

namespace IgniteLife.Tools.Commands;

public sealed class EfCommand
{
    public const string Name = "ef";

    public static void WriteUsage()
    {
        Console.WriteLine("Usage: ignite ef [--env <Environment>] <ef-subcommand> [args]");
        Console.WriteLine("Examples:");
        Console.WriteLine("  ignite ef --env Testing migrations add InitialCreate");
        Console.WriteLine("  ignite ef --env Testing database update");
    }

    public static async Task RunAsync(string[] args)
    {
        var (env, restAfterEnv) = Cli.SplitEnv(args, "Development");
        if (restAfterEnv.Length == 0 || Cli.IsHelp(restAfterEnv)) { WriteUsage(); return; }

        var sub = restAfterEnv[0].ToLowerInvariant();   // "migrations" | "database" | etc.
        var rest = restAfterEnv.Skip(1).ToList();

        // Always target the API project
        var baseArgs = new List<string>
        {
            "tool", "run", "dotnet-ef",
            sub
        };
        baseArgs.AddRange(rest);
        baseArgs.AddRange(new[]
        {
            "--project", "IgniteLifeApi",
            "--startup-project", "IgniteLifeApi"
        });

        // Only migrations add accepts output dir
        if (sub == "migrations" && rest.Count >= 1 && string.Equals(rest[0], "add", StringComparison.OrdinalIgnoreCase))
        {
            baseArgs.Add("-o");
            baseArgs.Add("Infrastructure/Data/Migrations");
        }

        var psi = new ProcessStartInfo
        {
            FileName = "dotnet",
            Arguments = string.Join(' ', baseArgs),
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = false,
            WorkingDirectory = Directory.GetCurrentDirectory()
        };

        if (!string.IsNullOrWhiteSpace(env))
            psi.Environment["ASPNETCORE_ENVIRONMENT"] = env;

        Console.WriteLine($"> {psi.FileName} {psi.Arguments}");
        if (env != null) Console.WriteLine($"> (ASPNETCORE_ENVIRONMENT={env})");

        using var p = Process.Start(psi);
        if (p is null) { Console.WriteLine("Failed to start EF process."); return; }

        var stdOutTask = p.StandardOutput.ReadToEndAsync().ContinueWith(t => Console.Write(t.Result));
        var stdErrTask = p.StandardError.ReadToEndAsync().ContinueWith(t => Console.Error.Write(t.Result));
        await Task.WhenAll(stdOutTask, stdErrTask);
        p.WaitForExit();
        Console.WriteLine($"EF exited with code {p.ExitCode}");
    }
}
