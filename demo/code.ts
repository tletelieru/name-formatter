type Literal = string | boolean | number | readonly string[] | undefined;

const quote = (value: string) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function literal(value: Literal): string {
  if (typeof value === 'string') return quote(value);
  if (Array.isArray(value)) return `[${value.map(quote).join(', ')}]`;
  return String(value);
}

export function objectLiteral(options: object): string {
  const entries = Object.entries(options as Record<string, Literal>).filter(
    ([, value]) => value !== undefined,
  );
  if (entries.length === 0) return '{}';
  return `{ ${entries.map(([key, value]) => `${key}: ${literal(value)}`).join(', ')} }`;
}

export function call(fn: string, ...args: string[]): { fn: string; args: string } {
  return { fn, args: args.join(', ') };
}

export const str = quote;
