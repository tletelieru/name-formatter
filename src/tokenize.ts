import { isConjunction, isParticle } from './particles';
import { fold } from './text';

export type Unit = string[];

function dictionaryMatchLength(words: string[], start: number, dictionary: string[][]): number {
  const candidate = dictionary.find((entry) =>
    entry.every((word, offset) => fold(words[start + offset] ?? '') === word),
  );
  return candidate?.length ?? 0;
}

export function prepareDictionary(entries: readonly string[]): string[][] {
  return entries
    .map((entry) => fold(entry).split(/\s+/).filter(Boolean))
    .filter((entry) => entry.length > 0)
    .sort((a, b) => b.length - a.length);
}

export function dictionaryUnits(
  words: string[],
  particles: readonly string[],
  dictionary: string[][] = [],
): Unit[] {
  const units: Unit[] = [];
  let chain: string[] = [];
  let index = 0;

  while (index < words.length) {
    const word = words[index] as string;
    const matched = chain.length === 0 ? dictionaryMatchLength(words, index, dictionary) : 0;

    if (matched > 0) {
      units.push(words.slice(index, index + matched));
      index += matched;
    } else if (isParticle(word, particles) && index < words.length - 1) {
      chain.push(word);
      index += 1;
    } else {
      const previous = units.at(-1);
      const [lead] = chain;
      if (previous && lead && isConjunction(lead, particles)) {
        previous.push(...chain, word);
      } else {
        units.push([...chain, word]);
      }
      chain = [];
      index += 1;
    }
  }

  return units;
}

export function takeParticleUnit(words: string[], particles: readonly string[]): number {
  let index = 0;
  while (index < words.length - 1 && isParticle(words[index] as string, particles)) {
    index += 1;
  }
  index += 1;

  let next = index;
  while (next < words.length && isParticle(words[next] as string, particles)) {
    next += 1;
  }
  if (next === index) {
    return index;
  }
  return Math.min(next + 1, words.length);
}

export function particleUnits(words: string[], particles: readonly string[]): Unit[] {
  const units: Unit[] = [];
  let rest = words;
  while (rest.length > 0) {
    const length = takeParticleUnit(rest, particles);
    units.push(rest.slice(0, length));
    rest = rest.slice(length);
  }
  return units;
}
