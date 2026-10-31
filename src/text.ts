const HYPHENS = /\s*[-‐‑–]\s*/g;

export function cleanName(name: string): string {
  return name.normalize('NFC').replace(/\s+/g, ' ').trim();
}

export function glueHyphens(name: string): string {
  return name.replace(HYPHENS, '-');
}

export function toWords(name: string): string[] {
  const cleaned = glueHyphens(cleanName(name));
  return cleaned ? cleaned.split(' ') : [];
}

export function fold(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}
