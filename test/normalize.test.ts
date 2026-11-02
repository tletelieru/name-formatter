import { describe, expect, it } from 'vitest';
import { normalizeName } from '../src';

describe('normalizeName', () => {
  it('always cleans whitespace and changes nothing else', () => {
    expect(normalizeName('  José \t Müller  ')).toBe('José Müller');
  });

  it('strips accents, with a keep list', () => {
    expect(normalizeName('Ángel Müller Çelik', { stripAccents: true })).toBe('Angel Muller Celik');
    expect(normalizeName('Núñez', { stripAccents: true, keep: ['ñ'] })).toBe('Nuñez');
    expect(normalizeName('NÚÑEZ', { stripAccents: true, keep: ['ñ'] })).toBe('NUÑEZ');
  });

  it.each([
    ['n', 'Munoz'],
    ['ni', 'Munioz'],
    ['nh', 'Munhoz'],
    ['ny', 'Munyoz'],
    ['gn', 'Mugnoz'],
    ['keep', 'Muñoz'],
  ])('enye %s', (enye, expected) => {
    expect(normalizeName('Muñoz', { enye })).toBe(expected);
  });

  it('matches enye case', () => {
    expect(normalizeName('MUÑOZ', { enye: 'ni' })).toBe('MUNIOZ');
    expect(normalizeName('Ñandú', { enye: 'ni' })).toBe('Niandú');
  });

  it('enye keep survives stripAccents', () => {
    expect(normalizeName('Núñez', { stripAccents: true, enye: 'keep' })).toBe('Nuñez');
  });

  it.each([
    ['remove', 'OHiggins'],
    ['space', 'O Higgins'],
    ['keep', "O'Higgins"],
    ['_', 'O_Higgins'],
  ])('apostrophe %s', (apostrophe, expected) => {
    expect(normalizeName('O’Higgins', { apostrophe })).toBe(expected);
  });

  it.each([
    ['remove', 'PérezCotapos'],
    ['space', 'Pérez Cotapos'],
    ['keep', 'Pérez-Cotapos'],
  ] as const)('hyphen %s', (hyphen, expected) => {
    expect(normalizeName('Pérez - Cotapos', { hyphen })).toBe(expected);
  });

  it('handles special characters with an allow list', () => {
    expect(normalizeName('Juan 2° Soto.', { specialChars: 'remove' })).toBe('Juan Soto');
    expect(normalizeName('J.R.R. Tolkien', { specialChars: 'space' })).toBe('J R R Tolkien');
    expect(normalizeName('J. Soto', { specialChars: 'remove', allow: ['.'] })).toBe('J. Soto');
    expect(normalizeName('Ana 👩‍💻 Soto', { specialChars: 'remove' })).toBe('Ana Soto');
    expect(normalizeName("O'Higgins-Soto", { specialChars: 'remove' })).toBe("O'Higgins-Soto");
  });

  it('treats custom rules as literal text', () => {
    expect(normalizeName('Muñoz', { enye: '$&' })).toBe('Mu$&oz');
    expect(normalizeName("O'Higgins", { apostrophe: '$&' })).toBe('O$&Higgins');
  });

  it('applies the custom map first', () => {
    expect(normalizeName('Gauß', { replace: { ß: 'ss' } })).toBe('Gauss');
    expect(normalizeName('Muñoz', { replace: { ñ: 'x' }, enye: 'n' })).toBe('Muxoz');
  });

  it('accepts decomposed input', () => {
    expect(normalizeName('Muñoz', { enye: 'n' })).toBe('Munoz');
  });

  it('ascii preset yields plain A-Z', () => {
    expect(normalizeName("Muñoz O'Higgins Pérez-Cotapos Gauß Ørsted", { preset: 'ascii' })).toBe(
      'Munoz OHiggins Perez Cotapos Gauss Orsted',
    );
  });

  it('email preset yields a lowercase handle', () => {
    expect(normalizeName("María Muñoz O'Higgins", { preset: 'email' })).toBe('mariamunozohiggins');
  });

  it('strict preset keeps letters and spaces only', () => {
    expect(normalizeName("Ñuñoa O'Higgins-Soto 2", { preset: 'strict' })).toBe(
      'Ñuñoa OHiggins Soto',
    );
  });

  it('undefined options keep the preset rule', () => {
    expect(
      normalizeName('Muñoz', { preset: 'ascii', enye: undefined, stripAccents: undefined }),
    ).toBe('Munoz');
  });

  it('options override the preset', () => {
    expect(normalizeName('Muñoz', { preset: 'ascii', enye: 'ni' })).toBe('Munioz');
  });
});
