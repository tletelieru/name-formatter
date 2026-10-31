export type NameFormat = 'upper' | 'lower' | 'capitalize' | 'capitalizeName';

export type EnyeRule = 'keep' | 'n' | 'ni' | 'nh' | 'ny' | (string & {});
export type ApostropheRule = 'keep' | 'remove' | 'space' | (string & {});
export type HyphenRule = 'keep' | 'remove' | 'space';
export type SpecialCharsRule = 'keep' | 'remove' | 'space';
export type NormalizePreset = 'ascii' | 'email' | 'strict';

export interface NormalizeOptions {
  preset?: NormalizePreset;
  replace?: Record<string, string>;
  stripAccents?: boolean;
  keep?: string[];
  enye?: EnyeRule;
  apostrophe?: ApostropheRule;
  hyphen?: HyphenRule;
  specialChars?: SpecialCharsRule;
  allow?: string[];
}

export interface ParticleOptions {
  particles?: readonly string[];
}

export interface FormatOptions extends ParticleOptions {
  normalize?: NormalizeOptions;
}

export type SplitStrategy = 'dictionary' | 'particle' | 'lastTwo' | 'surnameCount';
export type SurnameConvention = 'double' | 'single';

export interface SplitOptions extends ParticleOptions {
  strategy?: SplitStrategy;
  convention?: SurnameConvention;
  surnameCount?: number;
  compoundGivenNames?: readonly string[];
  compoundSurnames?: readonly string[];
  normalize?: NormalizeOptions;
}

export interface SeparatedName {
  givenNames: string;
  surnames: string;
}

export interface GivenNameParts {
  firstName: string;
  middleName: string;
}

export interface SurnameParts {
  firstSurname: string;
  secondSurname: string;
}

export interface SplitName extends SeparatedName, GivenNameParts, SurnameParts {}
