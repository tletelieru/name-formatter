import type { NormalizeOptions, NormalizePreset } from '../src';
import type { RuleId } from './messages';

export type Rule = 'keep' | 'remove' | 'space';
export type Enye = 'keep' | 'n' | 'ni' | 'nh' | 'ny';

export interface NormalizeState {
  preset: 'none' | NormalizePreset;
  stripAccents: 'auto' | 'on' | 'off';
  keepEnye: boolean;
  enye: 'auto' | Enye;
  apostrophe: 'auto' | Rule;
  hyphen: 'auto' | Rule;
  specialChars: 'auto' | Rule;
}

export const PRESETS: NormalizeState['preset'][] = ['none', 'ascii', 'email', 'strict'];
export const ENYES: Enye[] = ['keep', 'n', 'ni', 'nh', 'ny'];
export const RULES: Rule[] = ['keep', 'remove', 'space'];

export const DEFAULT_STATE: NormalizeState = {
  preset: 'none',
  stripAccents: 'auto',
  keepEnye: false,
  enye: 'auto',
  apostrophe: 'auto',
  hyphen: 'auto',
  specialChars: 'auto',
};

const auto = <T extends string>(value: 'auto' | T): T | undefined =>
  value === 'auto' ? undefined : value;

export function toOptions(state: NormalizeState): NormalizeOptions {
  const options: NormalizeOptions = {
    preset: state.preset === 'none' ? undefined : state.preset,
    stripAccents: state.stripAccents === 'auto' ? undefined : state.stripAccents === 'on',
    keep: state.keepEnye ? ['ñ'] : undefined,
    enye: auto(state.enye),
    apostrophe: auto(state.apostrophe),
    hyphen: auto(state.hyphen),
    specialChars: auto(state.specialChars),
  };
  return Object.fromEntries(
    Object.entries(options).filter(([, value]) => value !== undefined),
  ) as NormalizeOptions;
}

export const COMMON_RULES: { id: RuleId; state: Partial<NormalizeState> }[] = [
  { id: 'email', state: { preset: 'email' } },
  { id: 'ascii', state: { preset: 'ascii' } },
  { id: 'strict', state: { preset: 'strict' } },
  { id: 'keepEnye', state: { stripAccents: 'on', keepEnye: true } },
  { id: 'enyeNi', state: { enye: 'ni' } },
  { id: 'enyeNh', state: { enye: 'nh' } },
  { id: 'apostrophe', state: { apostrophe: 'space' } },
  { id: 'hyphen', state: { hyphen: 'space' } },
];
