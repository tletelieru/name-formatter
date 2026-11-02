import type { NameFormat, SplitName, SplitStrategy, SurnameConvention } from '../src';
import { useLocale, type Locale } from './preferences';

export type RuleId =
  'email' | 'ascii' | 'strict' | 'keepEnye' | 'enyeNi' | 'enyeNh' | 'apostrophe' | 'hyphen';

export type ShownStrategy = Exclude<SplitStrategy, 'surnameCount'>;

type Strings = {
  tagline: string;
  live: string;
  copy: string;
  copied: string;
  toLight: string;
  toDark: string;
  language: string;
  empty: string;
  input: { label: string; placeholder: string; examples: string; clear: string };
  format: { title: string; subtitle: string; labels: Record<NameFormat, string> };
  split: {
    title: string;
    subtitle: string;
    strategy: string;
    convention: string;
    strategies: Record<ShownStrategy, string>;
    conventions: Record<SurnameConvention, string>;
    fields: Record<keyof SplitName, string>;
  };
  normalize: {
    title: string;
    subtitle: string;
    preset: string;
    none: string;
    auto: string;
    on: string;
    off: string;
    keepEnye: string;
    autoHint: string;
    result: string;
    reset: string;
  };
  rules: { title: string; subtitle: string; apply: string; labels: Record<RuleId, string> };
  footer: { developedBy: string; license: string };
};

const messages: Record<Locale, Strings> = {
  en: {
    tagline:
      'Format, split and normalize person names, with first-class support for Spanish and Portuguese conventions. Zero dependencies.',
    live: 'Live playground. Everything runs in your browser.',
    copy: 'Copy',
    copied: 'Copied',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    language: 'Language',
    empty: 'empty',
    input: {
      label: 'Full name',
      placeholder: 'Type any full name',
      examples: 'Try',
      clear: 'Clear',
    },
    format: {
      title: 'Format',
      subtitle:
        "Change the case. capitalizeName keeps particles lowercase and handles O'Higgins, McDonald and hyphens.",
      labels: {
        upper: 'Upper case',
        lower: 'Lower case',
        capitalize: 'Every word capitalized',
        capitalizeName: 'Name case',
      },
    },
    split: {
      title: 'Split',
      subtitle: 'Separate given names from surnames.',
      strategy: 'Strategy',
      convention: 'Convention',
      strategies: {
        dictionary: 'Particles attach to the next word and known compounds stay together.',
        particle: 'The first word, plus any particle chain and the next word, forms one unit.',
        lastTwo: 'Always the last two units, without the dictionary.',
      },
      conventions: { double: 'Two surnames', single: 'One surname' },
      fields: {
        givenNames: 'Given names',
        surnames: 'Surnames',
        firstName: 'First name',
        middleName: 'Middle name',
        firstSurname: 'First surname',
        secondSurname: 'Second surname',
      },
    },
    normalize: {
      title: 'Normalize',
      subtitle:
        'Clean a name for emails, usernames or legacy systems. Whitespace is always cleaned; every other rule is opt-in.',
      preset: 'Preset',
      none: 'none',
      auto: 'auto',
      on: 'on',
      off: 'off',
      keepEnye: 'Keep ñ when stripping accents',
      autoHint:
        '“auto” leaves the option out, so the preset decides. Explicit options override it.',
      result: 'Result',
      reset: 'Reset',
    },
    rules: {
      title: 'Common rules',
      subtitle: 'Ready-made options applied to the name above. Apply one to tweak it.',
      apply: 'Apply',
      labels: {
        email: 'Email or username',
        ascii: 'Plain ASCII',
        strict: 'Letters and spaces only',
        keepEnye: 'Strip accents, keep ñ',
        enyeNi: 'ñ as ni',
        enyeNh: 'ñ as nh (Portuguese)',
        apostrophe: 'Apostrophe as space',
        hyphen: 'Hyphen as space',
      },
    },
    footer: { developedBy: 'Developed by', license: 'MIT license' },
  },
  es: {
    tagline:
      'Formatea, separa y normaliza nombres de personas, con soporte completo para las convenciones del español y el portugués. Sin dependencias.',
    live: 'Prueba en vivo. Todo corre en tu navegador.',
    copy: 'Copiar',
    copied: 'Copiado',
    toLight: 'Cambiar a modo claro',
    toDark: 'Cambiar a modo oscuro',
    language: 'Idioma',
    empty: 'vacío',
    input: {
      label: 'Nombre completo',
      placeholder: 'Escribe cualquier nombre completo',
      examples: 'Prueba con',
      clear: 'Borrar',
    },
    format: {
      title: 'Formato',
      subtitle:
        "Cambia mayúsculas y minúsculas. capitalizeName deja las partículas en minúscula y maneja O'Higgins, McDonald y guiones.",
      labels: {
        upper: 'Mayúsculas',
        lower: 'Minúsculas',
        capitalize: 'Cada palabra con mayúscula',
        capitalizeName: 'Formato de nombre',
      },
    },
    split: {
      title: 'Separar',
      subtitle: 'Separa los nombres de los apellidos.',
      strategy: 'Estrategia',
      convention: 'Convención',
      strategies: {
        dictionary:
          'Las partículas se unen a la palabra siguiente y los compuestos conocidos se mantienen juntos.',
        particle:
          'La primera palabra, más cualquier cadena de partículas y la palabra siguiente, forma una unidad.',
        lastTwo: 'Siempre las dos últimas unidades, sin diccionario.',
      },
      conventions: { double: 'Dos apellidos', single: 'Un apellido' },
      fields: {
        givenNames: 'Nombres',
        surnames: 'Apellidos',
        firstName: 'Primer nombre',
        middleName: 'Segundo nombre',
        firstSurname: 'Primer apellido',
        secondSurname: 'Segundo apellido',
      },
    },
    normalize: {
      title: 'Normalizar',
      subtitle:
        'Limpia un nombre para correos, usuarios o sistemas antiguos. Los espacios siempre se limpian; el resto de las reglas es opcional.',
      preset: 'Preset',
      none: 'ninguno',
      auto: 'auto',
      on: 'sí',
      off: 'no',
      keepEnye: 'Mantener la ñ al quitar tildes',
      autoHint:
        '“auto” omite la opción y la decide el preset. Las opciones explícitas tienen prioridad sobre él.',
      result: 'Resultado',
      reset: 'Restablecer',
    },
    rules: {
      title: 'Reglas comunes',
      subtitle: 'Opciones listas aplicadas al nombre de arriba. Aplica una para ajustarla.',
      apply: 'Aplicar',
      labels: {
        email: 'Correo o usuario',
        ascii: 'ASCII simple',
        strict: 'Solo letras y espacios',
        keepEnye: 'Sin tildes, con ñ',
        enyeNi: 'ñ como ni',
        enyeNh: 'ñ como nh (portugués)',
        apostrophe: 'Apóstrofo como espacio',
        hyphen: 'Guion como espacio',
      },
    },
    footer: { developedBy: 'Desarrollado por', license: 'Licencia MIT' },
  },
};

export function useMessages(): Strings {
  return messages[useLocale()];
}
