# name-formatter — project brief

Source spec: Notion page "Name Formatter (npm package)"
(https://app.notion.com/p/40a222f5472b814eab9fc8260e886d69).

Zero-dependency TypeScript library published as `@tletelieru/name-formatter`. The repo stays private
until the demo is ready; GitHub Pages is enabled when it goes public.

## Split rule

In the default `dictionary` strategy, a particle chain attaches only to the next word
(`Juan de la Fuente Rojas` → `Juan` + `de la Fuente` + `Rojas`). A word plus a particle chain merges
into one unit only through the dictionary (`María de los Ángeles`, `Matus de la Parra`). The
`particle` strategy keeps the Notion rule as written.

## Working rules

- No code comments unless explicitly requested.
- Runtime dependencies stay at zero.
