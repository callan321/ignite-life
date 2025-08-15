using System;
using System.Collections.Generic;
using System.Linq;

namespace IgniteLife.Tools.Commands.Common;

public static class Cli
{
    // Return an UNNAMED tuple to avoid CS8126 on some compilers
    public static (string, string[]) SplitEnv(string[] args, string defaultEnv)
    {
        string env = defaultEnv;
        var rest = new List<string>(args.Length);

        for (int i = 0; i < args.Length; i++)
        {
            var t = args[i];
            if (string.Equals(t, "--env", StringComparison.OrdinalIgnoreCase) && i + 1 < args.Length)
            {
                env = args[i + 1];
                i++; // skip value
                continue;
            }
            rest.Add(t);
        }

        env ??= defaultEnv;
        return (env, rest.ToArray());
    }

    public static bool IsHelp(params string[] args)
        => args.Any(a => a is "-h" or "--help" or "/?" or "help");

    public static void PrintGeneralUsage()
    {
        Console.WriteLine("ignite — Ignite Life developer CLI\n");
        Console.WriteLine("Usage:");
        Console.WriteLine("  ignite <command> [options]\n");
        Console.WriteLine("Common options:");
        Console.WriteLine("  --env <Environment>   Use appsettings.<Environment>.json (default: Development)");
        Console.WriteLine("  -h, --help            Show help\n");
        Console.WriteLine("Commands:");
        Console.WriteLine("  seed-admin <email> <password> [--env <Environment>]");
        Console.WriteLine("  seed-booking-rules [--env <Environment>]");
        Console.WriteLine("  ef [--env <Environment>] <ef-subcommand> [args]\n");
        Console.WriteLine("Examples:");
        Console.WriteLine("  dotnet ignite seed-admin admin@example.com P@ssw0rd --env Testing");
        Console.WriteLine("  dotnet ignite seed-booking-rules --env Testing");
        Console.WriteLine("  dotnet ignite ef migrations add AddWidget --env Testing");
    }
}
