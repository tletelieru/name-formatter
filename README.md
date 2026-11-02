# name-formatter

Zero-dependency TypeScript library to format and split person names, with first-class support for
Spanish and Portuguese conventions (two surnames, compound names, surnames joined by particles).

```sh
npm install @tletelieru/name-formatter
```

## Format

```ts
import { formatName } from '@tletelieru/name-formatter';

formatName('MARÍA DE LOS ÁNGELES MATUS DE LA PARRA', 'capitalizeName');
// 'María de los Ángeles Matus de la Parra'
```

Formats: `upper`, `lower`, `capitalize`, `capitalizeName`. Each is also exported as a function.
`capitalizeName` keeps particles lowercase, except at the start of the name, and handles `O'Higgins`,
`McDonald`, `MacGregor` and `Pérez-Cotapos`. Pass `{ particles }` to replace the default list, and
`{ normalize }` to run the normalizer first.

## Normalize

```ts
import { normalizeName } from '@tletelieru/name-formatter';

normalizeName('Muñoz', { enye: 'ni' }); // 'Munioz'
normalizeName("O'Higgins", { apostrophe: 'space' }); // 'O Higgins'
normalizeName('Núñez', { stripAccents: true, keep: ['ñ'] }); // 'Nuñez'
normalizeName("María Muñoz O'Higgins", { preset: 'email' }); // 'mariamunozohiggins'
```

Whitespace is always cleaned. Every other rule is opt-in:

| Option         | Values                                                                   |
| -------------- | ------------------------------------------------------------------------ |
| `replace`      | map applied first, for example `{ ß: 'ss' }`                             |
| `stripAccents` | `true`, with `keep: ['ñ']` to exempt characters                          |
| `enye`         | `'keep'`, `'n'`, `'ni'`, `'nh'`, `'ny'` or any string                    |
| `apostrophe`   | `'keep'`, `'remove'`, `'space'` or any string; unifies `’ ‘` and `` ` `` |
| `hyphen`       | `'keep'`, `'remove'`, `'space'`                                          |
| `specialChars` | `'keep'`, `'remove'`, `'space'`, with an `allow` list                    |
| `preset`       | `'ascii'`, `'email'`, `'strict'`; other options override it              |

## Split

```ts
import { splitName, splitSurnames } from '@tletelieru/name-formatter';

splitName('María de los Ángeles Matus de la Parra');
// { givenNames: 'María de los Ángeles', surnames: 'Matus de la Parra',
//   firstName: 'María de los Ángeles', middleName: '',
//   firstSurname: 'Matus de la Parra', secondSurname: '' }

splitSurnames('Matus Soto Sevilla', { strategy: 'particle' });
// { firstSurname: 'Matus', secondSurname: 'Soto Sevilla' }
```

`splitName` also accepts `{ givenNames, surnames }` when both are already known, which removes all
ambiguity. `splitGivenNames` and `splitSurnames` work on one side only.

| Strategy       | Rule                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| `dictionary`   | Default. Particles attach to the next word; known compounds stay together; last 2 units are surnames |
| `particle`     | First word, plus any particle chain and the next word, forms one unit                                |
| `lastTwo`      | Always the last 2 units, without the dictionary                                                      |
| `surnameCount` | Explicit `surnameCount` units                                                                        |

Hyphenated words are always one unit. `convention: 'single'` expects one surname. Extend the
dictionary with `compoundGivenNames` and `compoundSurnames`.

In given names, a particle and its word always join the previous name, so `Ana de Jesús` is one name
without a dictionary entry. Surnames are more ambiguous, so the default is a best guess there:
`Pedro Soto de la Vega` gives surnames `Soto` and `de la Vega` unless `Soto de la Vega` is in the
dictionary.

## License

MIT
