import { normalizeName } from './normalize';
import { isParticle, DEFAULT_PARTICLES } from './particles';
import { cleanName, glueHyphens, toWords } from './text';
import type { FormatOptions, NameFormat, ParticleOptions } from './types';

const MAC_SURNAMES = [
  'arthur',
  'donald',
  'dougall',
  'gregor',
  'intyre',
  'kenzie',
  'laren',
  'lean',
  'millan',
  'neil',
  'pherson',
];

function title(value: string): string {
  const [first = '', ...rest] = Array.from(value);
  return first.toUpperCase() + rest.join('').toLowerCase();
}

function capitalizePrefixed(segment: string): string {
  const lowered = segment.toLowerCase();
  if (/^mc\p{L}/u.test(lowered)) {
    return `Mc${title(lowered.slice(2))}`;
  }
  if (lowered.startsWith('mac') && MAC_SURNAMES.includes(lowered.slice(3))) {
    return `Mac${title(lowered.slice(3))}`;
  }
  return title(lowered);
}

function capitalizeWord(word: string): string {
  return word
    .split(/(['’‘`´ʼ-])/)
    .map((part, index) => (index % 2 === 0 ? capitalizePrefixed(part) : part))
    .join('');
}

export function upper(name: string): string {
  return glueHyphens(cleanName(name)).toUpperCase();
}

export function lower(name: string): string {
  return glueHyphens(cleanName(name)).toLowerCase();
}

export function capitalize(name: string): string {
  return toWords(name).map(capitalizeWord).join(' ');
}

export function capitalizeName(name: string, options: ParticleOptions = {}): string {
  const particles = options.particles ?? DEFAULT_PARTICLES;
  const words = toWords(name);
  return words
    .map((word, index) => {
      const hasNormalWordAfter = words.slice(index + 1).some((w) => !isParticle(w, particles));
      const keepLower = index > 0 && hasNormalWordAfter && isParticle(word, particles);
      return keepLower ? word.toLowerCase() : capitalizeWord(word);
    })
    .join(' ');
}

export function formatName(name: string, format: NameFormat, options: FormatOptions = {}): string {
  const value = options.normalize ? normalizeName(name, options.normalize) : name;
  switch (format) {
    case 'upper':
      return upper(value);
    case 'lower':
      return lower(value);
    case 'capitalize':
      return capitalize(value);
    case 'capitalizeName':
      return capitalizeName(value, options);
  }
}
