import { describe, expect, it } from 'vitest';
import { splitGivenNames, splitName, splitSurnames } from '../src';
import { defaultSplitFixtures } from './fixtures/names';

describe('splitName defaults', () => {
  it.each(defaultSplitFixtures)('$input', ({ input, ...expected }) => {
    expect(splitName(input)).toEqual(expected);
  });

  it('needs a dictionary entry to merge an unknown compound surname', () => {
    expect(splitName('Pedro Soto de la Vega').surnames).toBe('Soto de la Vega');
    expect(splitName('Pedro Soto de la Vega').firstSurname).toBe('Soto');
    expect(
      splitName('Pedro Soto de la Vega', { compoundSurnames: ['Soto de la Vega'] }).firstSurname,
    ).toBe('Soto de la Vega');
  });

  it('matches the dictionary regardless of case and accents', () => {
    expect(splitName('MARIA DE LOS ANGELES SOTO').firstName).toBe('MARIA DE LOS ANGELES');
  });
});

describe('splitName options', () => {
  it('convention single', () => {
    expect(splitName('Juan Pablo Soto', { convention: 'single' })).toMatchObject({
      firstName: 'Juan',
      middleName: 'Pablo',
      firstSurname: 'Soto',
      secondSurname: '',
    });
  });

  it('surnameCount', () => {
    expect(splitName('Ana Soto Rojas Vera', { surnameCount: 3 })).toMatchObject({
      givenNames: 'Ana',
      firstSurname: 'Soto',
      secondSurname: 'Rojas Vera',
    });
    expect(splitName('Ana Soto', { surnameCount: 0 })).toMatchObject({
      givenNames: 'Ana Soto',
      surnames: '',
    });
  });

  it('rejects invalid surnameCount', () => {
    expect(() => splitName('Ana', { surnameCount: -1 })).toThrow(RangeError);
    expect(() => splitName('Ana', { strategy: 'surnameCount' })).toThrow(TypeError);
  });

  it('lastTwo always takes two surname units and skips the dictionary', () => {
    expect(splitName('Juan Soto', { strategy: 'lastTwo' })).toMatchObject({
      givenNames: '',
      firstSurname: 'Juan',
      secondSurname: 'Soto',
    });
    expect(splitName('Ana Matus de la Parra', { strategy: 'lastTwo' })).toMatchObject({
      givenNames: 'Ana',
      firstSurname: 'Matus',
      secondSurname: 'de la Parra',
    });
  });

  it('particle strategy uses the word-plus-chain rule on full names', () => {
    expect(splitName('Ana Matus de la Parra Sevilla', { strategy: 'particle' })).toMatchObject({
      firstName: 'Ana',
      firstSurname: 'Matus de la Parra',
      secondSurname: 'Sevilla',
    });
  });

  it('accepts given names and surnames separately', () => {
    expect(splitName({ givenNames: 'Juan Pablo', surnames: 'de la Fuente Rojas' })).toEqual({
      givenNames: 'Juan Pablo',
      surnames: 'de la Fuente Rojas',
      firstName: 'Juan',
      middleName: 'Pablo',
      firstSurname: 'de la Fuente',
      secondSurname: 'Rojas',
    });
  });

  it('chains the normalizer first', () => {
    expect(splitName('Juan Muñoz Soto', { normalize: { enye: 'n' } }).firstSurname).toBe('Munoz');
  });
});

describe('splitSurnames', () => {
  it.each([
    ['Matus de la Parra Sevilla', 'Matus de la Parra', 'Sevilla'],
    ['Matus Soto Sevilla', 'Matus', 'Soto Sevilla'],
    ['de la Fuente Rojas', 'de la Fuente', 'Rojas'],
    ['Pérez-Cotapos Soto', 'Pérez-Cotapos', 'Soto'],
    ['Soto Pérez - Cotapos', 'Soto', 'Pérez-Cotapos'],
    ['Vega de la', 'Vega de la', ''],
  ])('particle strategy: %s', (input, firstSurname, secondSurname) => {
    expect(splitSurnames(input, { strategy: 'particle' })).toEqual({ firstSurname, secondSurname });
  });

  it('defaults to the dictionary', () => {
    expect(splitSurnames('Matus de la Parra Sevilla')).toEqual({
      firstSurname: 'Matus de la Parra',
      secondSurname: 'Sevilla',
    });
    expect(splitSurnames('Soto de la Vega')).toEqual({
      firstSurname: 'Soto',
      secondSurname: 'de la Vega',
    });
  });
});

describe('splitGivenNames', () => {
  it('particle strategy', () => {
    expect(splitGivenNames('María de los Ángeles Isabel', { strategy: 'particle' })).toEqual({
      firstName: 'María de los Ángeles',
      middleName: 'Isabel',
    });
  });

  it('defaults to the dictionary', () => {
    expect(splitGivenNames('María del Carmen Isabel')).toEqual({
      firstName: 'María del Carmen',
      middleName: 'Isabel',
    });
    expect(splitGivenNames('Juan Pablo')).toEqual({ firstName: 'Juan', middleName: 'Pablo' });
    expect(splitGivenNames('María José Ignacia')).toEqual({
      firstName: 'María José',
      middleName: 'Ignacia',
    });
  });
});
