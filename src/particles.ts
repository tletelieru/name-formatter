export const DEFAULT_PARTICLES: readonly string[] = [
  'de',
  'del',
  'la',
  'las',
  'los',
  'y',
  'e',
  'da',
  'das',
  'do',
  'dos',
  'di',
  'du',
  'van',
  'der',
  'von',
  'le',
];

const CONJUNCTIONS: readonly string[] = ['y', 'e'];

export function isParticle(
  word: string,
  particles: readonly string[] = DEFAULT_PARTICLES,
): boolean {
  const lowered = word.toLowerCase();
  return particles.some((particle) => particle.toLowerCase() === lowered);
}

export function isConjunction(word: string, particles: readonly string[]): boolean {
  return isParticle(word, particles) && CONJUNCTIONS.includes(word.toLowerCase());
}
