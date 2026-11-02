import { cleanName } from './text';
import type { NormalizeOptions, NormalizePreset } from './types';

const APOSTROPHES = /['’‘`´ʼ]/g;
const SPACED_HYPHENS = /\s*[-‐‑–]\s*/g;
const SPECIAL_CHAR = /[^\p{L}\p{M}\s'’‘`´ʼ\-‐‑–]|[️‍]/gu;

const ASCII_MAP: Record<string, string> = {
  ß: 'ss',
  æ: 'ae',
  Æ: 'AE',
  œ: 'oe',
  Œ: 'OE',
  ø: 'o',
  Ø: 'O',
  ł: 'l',
  Ł: 'L',
  đ: 'd',
  Đ: 'D',
  ð: 'd',
  Ð: 'D',
  þ: 'th',
  Þ: 'Th',
};

const PRESETS: Record<NormalizePreset, NormalizeOptions> = {
  ascii: {
    replace: ASCII_MAP,
    stripAccents: true,
    enye: 'n',
    apostrophe: 'remove',
    hyphen: 'space',
    specialChars: 'remove',
  },
  email: {
    replace: ASCII_MAP,
    stripAccents: true,
    enye: 'n',
    apostrophe: 'remove',
    hyphen: 'remove',
    specialChars: 'remove',
  },
  strict: {
    apostrophe: 'remove',
    hyphen: 'space',
    specialChars: 'remove',
  },
};

const BUILT_IN_RULES: Record<string, string> = { remove: '', space: ' ' };

function resolveOptions(options: NormalizeOptions): NormalizeOptions {
  const preset = options.preset ? PRESETS[options.preset] : {};
  const defined = Object.fromEntries(
    Object.entries(options).filter(([, value]) => value !== undefined),
  );
  return { ...preset, ...defined, replace: { ...preset.replace, ...options.replace } };
}

function applyReplacements(value: string, replace: Record<string, string>): string {
  return Object.entries(replace).reduce(
    (result, [from, to]) => (from ? result.split(from).join(to) : result),
    value,
  );
}

function matchEnyeCase(replacement: string, next: string | undefined): string {
  if (next && next !== next.toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }
  return replacement.toUpperCase();
}

function applyEnye(value: string, replacement: string): string {
  return value
    .replace(/ñ/g, () => replacement)
    .replace(/Ñ(\p{L})?/gu, (_, next: string | undefined) => {
      return matchEnyeCase(replacement, next) + (next ?? '');
    });
}

function stripAccents(value: string, keep: readonly string[]): string {
  const kept = new Set(keep.flatMap((char) => [char.toLowerCase(), char.toUpperCase()]));
  return Array.from(value, (char) =>
    kept.has(char) ? char : char.normalize('NFD').replace(/\p{M}/gu, ''),
  ).join('');
}

function applySpecialChars(value: string, rule: string, allow: readonly string[]): string {
  const replacement = BUILT_IN_RULES[rule] ?? '';
  return value.replace(SPECIAL_CHAR, (char) => (allow.includes(char) ? char : replacement));
}

export function normalizeName(name: string, options: NormalizeOptions = {}): string {
  const resolved = resolveOptions(options);
  const { enye, apostrophe, hyphen, specialChars } = resolved;
  const keep = [...(resolved.keep ?? [])];

  let result = cleanName(name);
  result = applyReplacements(result, resolved.replace ?? {});

  if (enye === 'keep') {
    keep.push('ñ');
  } else if (enye !== undefined) {
    result = applyEnye(result, enye);
  }

  if (specialChars !== undefined && specialChars !== 'keep') {
    result = applySpecialChars(result, specialChars, resolved.allow ?? []);
  }

  if (apostrophe !== undefined) {
    const replacement = apostrophe === 'keep' ? "'" : (BUILT_IN_RULES[apostrophe] ?? apostrophe);
    result = result.replace(APOSTROPHES, () => replacement);
  }

  if (hyphen !== undefined) {
    const replacement = hyphen === 'keep' ? '-' : (BUILT_IN_RULES[hyphen] ?? '');
    result = result.replace(SPACED_HYPHENS, replacement);
  }

  if (resolved.stripAccents) {
    result = stripAccents(result, keep);
  }

  if (resolved.preset === 'email') {
    return result.toLowerCase().replace(/\s+/g, '');
  }

  return cleanName(result);
}
