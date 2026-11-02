# name-formatter — project brief

Zero-dependency TypeScript library published as `@tletelieru/name-formatter`, with a demo on GitHub
Pages.

## Split rule

In the default `dictionary` strategy, a particle chain attaches only to the next word
(`Juan de la Fuente Rojas` → `Juan` + `de la Fuente` + `Rojas`). A word plus a particle chain merges
into one unit only through the dictionary (`María de los Ángeles`, `Matus de la Parra`). The
`particle` strategy merges a word, its particle chain and the next word into one unit.

## Working rules

- No code comments unless explicitly requested.
- Runtime dependencies stay at zero.
