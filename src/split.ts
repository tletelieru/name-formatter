import { COMPOUND_GIVEN_NAMES, COMPOUND_SURNAMES } from './dictionary';
import { normalizeName } from './normalize';
import { DEFAULT_PARTICLES } from './particles';
import { toWords } from './text';
import {
  dictionaryUnits,
  particleUnits,
  prepareDictionary,
  takeParticleUnit,
  type Unit,
} from './tokenize';
import type { GivenNameParts, SeparatedName, SplitName, SplitOptions, SurnameParts } from './types';

const join = (units: Unit[]): string => units.flat().join(' ');

function prepareWords(value: string, options: SplitOptions): string[] {
  return toWords(options.normalize ? normalizeName(value, options.normalize) : value);
}

function fullNameDictionary(options: SplitOptions): string[][] {
  return prepareDictionary([
    ...COMPOUND_GIVEN_NAMES,
    ...COMPOUND_SURNAMES,
    ...(options.compoundGivenNames ?? []),
    ...(options.compoundSurnames ?? []),
  ]);
}

function resolveSurnameCount(unitCount: number, options: SplitOptions): number {
  const { strategy, surnameCount, convention } = options;
  if (surnameCount !== undefined) {
    if (!Number.isInteger(surnameCount) || surnameCount < 0) {
      throw new RangeError('surnameCount must be a non-negative integer');
    }
    return surnameCount;
  }
  if (strategy === 'surnameCount') {
    throw new TypeError("strategy 'surnameCount' requires the surnameCount option");
  }
  if (convention === 'single') {
    return Math.min(1, unitCount - 1);
  }
  if (strategy === 'lastTwo') {
    return 2;
  }
  return Math.min(2, unitCount - 1);
}

function buildUnits(words: string[], options: SplitOptions): Unit[] {
  const particles = options.particles ?? DEFAULT_PARTICLES;
  if (options.strategy === 'particle') {
    return particleUnits(words, particles);
  }
  const dictionary = options.strategy === 'lastTwo' ? [] : fullNameDictionary(options);
  return dictionaryUnits(words, particles, dictionary);
}

function firstAndRest(words: string[], options: SplitOptions, dictionary: string[][]): Unit[] {
  const particles = options.particles ?? DEFAULT_PARTICLES;
  if (options.strategy === 'particle') {
    const length = takeParticleUnit(words, particles);
    return [words.slice(0, length), words.slice(length)];
  }
  const [first = [], ...rest] = dictionaryUnits(words, particles, dictionary);
  return [first, rest.flat()];
}

export function splitGivenNames(givenNames: string, options: SplitOptions = {}): GivenNameParts {
  const dictionary = prepareDictionary([
    ...COMPOUND_GIVEN_NAMES,
    ...(options.compoundGivenNames ?? []),
  ]);
  const [first, rest] = firstAndRest(prepareWords(givenNames, options), options, dictionary) as [
    Unit,
    Unit,
  ];
  return { firstName: first.join(' '), middleName: rest.join(' ') };
}

export function splitSurnames(surnames: string, options: SplitOptions = {}): SurnameParts {
  const dictionary = prepareDictionary([...COMPOUND_SURNAMES, ...(options.compoundSurnames ?? [])]);
  const [first, rest] = firstAndRest(prepareWords(surnames, options), options, dictionary) as [
    Unit,
    Unit,
  ];
  return { firstSurname: first.join(' '), secondSurname: rest.join(' ') };
}

function fromSeparated(name: SeparatedName, options: SplitOptions): SplitName {
  const given = prepareWords(name.givenNames, options).join(' ');
  const surnames = prepareWords(name.surnames, options).join(' ');
  const parts = { ...options, normalize: undefined };
  return {
    givenNames: given,
    surnames,
    ...splitGivenNames(given, parts),
    ...splitSurnames(surnames, parts),
  };
}

export function splitName(name: string | SeparatedName, options: SplitOptions = {}): SplitName {
  if (typeof name !== 'string') {
    return fromSeparated(name, options);
  }

  const units = buildUnits(prepareWords(name, options), options);
  const count = Math.min(resolveSurnameCount(units.length, options), units.length);
  const boundary = units.length - count;
  const [firstGiven = [], ...otherGiven] = units.slice(0, boundary);
  const [firstSurname = [], ...otherSurnames] = units.slice(boundary);

  return {
    givenNames: join(units.slice(0, boundary)),
    surnames: join(units.slice(boundary)),
    firstName: firstGiven.join(' '),
    middleName: join(otherGiven),
    firstSurname: firstSurname.join(' '),
    secondSurname: join(otherSurnames),
  };
}
