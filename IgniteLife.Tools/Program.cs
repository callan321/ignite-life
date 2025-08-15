using IgniteLife.Tools.Commands;
using IgniteLife.Tools.Commands.Common;

if (args.Length == 0 || Cli.IsHelp(args))
{
    Cli.PrintGeneralUsage();
    return;
}

var cmd = args[0].ToLowerInvariant();
var rest = args.Skip(1).ToArray();

if (cmd is "help" or "-h" or "--help")
{
    Cli.PrintGeneralUsage();
}
else if (cmd == SeedAdminCommand.Name)
{
    if (Cli.IsHelp(rest)) SeedAdminCommand.WriteUsage();
    else await SeedAdminCommand.RunAsync(rest);
}
else if (cmd == SeedBookingRulesCommand.Name)
{
    if (Cli.IsHelp(rest)) SeedBookingRulesCommand.WriteUsage();
    else await SeedBookingRulesCommand.RunAsync(rest);
}
else if (cmd == EfCommand.Name)
{
    if (Cli.IsHelp(rest)) EfCommand.WriteUsage();
    else await EfCommand.RunAsync(rest);
}
else
{
    Console.WriteLine($"Unknown command '{cmd}'.\n");
    Cli.PrintGeneralUsage();
}
