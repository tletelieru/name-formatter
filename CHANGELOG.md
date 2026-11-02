# @tletelieru/name-formatter

## 0.1.2

### Patch Changes

- Add the Catalan conjunction `i` as a particle, so `Puig i Cadafalch` stays one surname and `i` stays lowercase in `capitalizeName`.

## 0.1.1

### Patch Changes

- Treat María José, María Jesús, José María and Jesús María as a single given name, so `María José Soto Rojas` splits into first name `María José` with no middle name.
- `normalizeName` ignores options passed as `undefined`, so `{ preset: 'email', stripAccents: undefined }` keeps the preset's rule.

## 0.1.0

### Minor Changes

- b192738: First release: case functions, normalizer with presets, and name splitting with dictionary, particle, lastTwo and surnameCount strategies.
