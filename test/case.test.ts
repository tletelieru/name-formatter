import { describe, expect, it } from 'vitest';
import { capitalize, capitalizeName, formatName, isParticle, lower, upper } from '../src';
import { capitalizeNameFixtures } from './fixtures/names';

describe('case functions', () => {
  it('upper and lower keep accents and collapse spaces', () => {
    expect(upper('  maría   ñuñez ')).toBe('MARÍA ÑUÑEZ');
    expect(lower('MARÍA ÑUÑEZ')).toBe('maría ñuñez');
  });

  it('capitalize applies to every word', () => {
    expect(capitalize('maría DE LOS ángeles')).toBe('María De Los Ángeles');
  });

  it.each(capitalizeNameFixtures)('capitalizeName(%s)', (input, expected) => {
    expect(capitalizeName(input)).toBe(expected);
  });

  it('honours a custom particle list', () => {
    expect(capitalizeName('juan al fayed', { particles: ['al'] })).toBe('Juan al Fayed');
    expect(capitalizeName('juan de soto', { particles: ['al'] })).toBe('Juan De Soto');
  });

  it('isParticle ignores case', () => {
    expect(isParticle('DE')).toBe(true);
    expect(isParticle('Soto')).toBe(false);
  });
});

describe('formatName', () => {
  it('dispatches every format', () => {
    const name = 'MARÍA DE LOS ÁNGELES';
    expect(formatName(name, 'upper')).toBe(name);
    expect(formatName(name, 'lower')).toBe('maría de los ángeles');
    expect(formatName(name, 'capitalize')).toBe('María De Los Ángeles');
    expect(formatName(name, 'capitalizeName')).toBe('María de los Ángeles');
  });

  it('chains the normalizer first', () => {
    expect(formatName('MUÑOZ', 'capitalize', { normalize: { enye: 'n' } })).toBe('Munoz');
  });
});
