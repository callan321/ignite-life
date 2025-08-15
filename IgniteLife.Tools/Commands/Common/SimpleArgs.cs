using System;
using System.Collections.Generic;

namespace IgniteLife.Tools.Commands;

public sealed class SimpleArgs
{
    private readonly Dictionary<string, string?> _map = new(StringComparer.OrdinalIgnoreCase);
    private readonly HashSet<string> _flags = new(StringComparer.OrdinalIgnoreCase);

    private SimpleArgs() { }

    public static SimpleArgs Parse(string[] args)
    {
        var sa = new SimpleArgs();
        for (int i = 0; i < args.Length; i++)
        {
            var token = args[i];
            if (!token.StartsWith("--"))
                continue;

            var eq = token.IndexOf('=');
            if (eq > 2)
            {
                var key = token[..eq];
                var value = token[(eq + 1)..];
                sa._map[key] = value;
                continue;
            }

            if (i + 1 >= args.Length || args[i + 1].StartsWith("--"))
            {
                sa._flags.Add(token);
                continue;
            }

            var next = args[i + 1];
            sa._map[token] = next;
            i++;
        }

        return sa;
    }

    public string? Get(string key, string? defaultValue = null) =>
        _map.TryGetValue(key, out var v) ? v : defaultValue;

    public bool Has(string flag) => _flags.Contains(flag);
}
