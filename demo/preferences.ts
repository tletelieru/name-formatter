import { useSyncExternalStore } from 'react';
import type { ColorMode } from './theme';

export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

const LOCALE_KEY = 'preferred-lang';
const MODE_KEY = 'color-mode';

const listeners = new Set<() => void>();
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
}

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

function getLocale(): Locale {
  const saved = read(LOCALE_KEY);
  if (isLocale(saved)) return saved;
  for (const language of navigator.languages) {
    const short = language.toLowerCase().split('-')[0];
    if (isLocale(short)) return short;
  }
  return 'en';
}

function getMode(): ColorMode {
  const saved = read(MODE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return darkQuery.matches ? 'dark' : 'light';
}

function notify(): void {
  document.documentElement.lang = getLocale();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener('storage', notify);
  darkQuery.addEventListener('change', notify);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', notify);
    darkQuery.removeEventListener('change', notify);
  };
}

document.documentElement.lang = getLocale();

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getLocale);
}

export function useColorMode(): ColorMode {
  return useSyncExternalStore(subscribe, getMode);
}

export function setLocale(locale: Locale): void {
  write(LOCALE_KEY, locale);
  notify();
}

export function setColorMode(mode: ColorMode): void {
  write(MODE_KEY, mode);
  notify();
}
