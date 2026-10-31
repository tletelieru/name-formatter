import {
  formatName,
  normalizeName,
  splitName,
  type NameFormat,
  type NormalizeOptions,
  type SplitStrategy,
} from '../src';

const FORMATS: NameFormat[] = ['upper', 'lower', 'capitalize', 'capitalizeName'];

const NORMALIZERS: [string, NormalizeOptions][] = [
  ['stripAccents', { stripAccents: true }],
  ['stripAccents, keep ñ', { stripAccents: true, keep: ['ñ'] }],
  ["enye: 'n'", { enye: 'n' }],
  ["enye: 'ni'", { enye: 'ni' }],
  ["enye: 'nh'", { enye: 'nh' }],
  ["enye: 'ny'", { enye: 'ny' }],
  ["apostrophe: 'remove'", { apostrophe: 'remove' }],
  ["apostrophe: 'space'", { apostrophe: 'space' }],
  ["hyphen: 'remove'", { hyphen: 'remove' }],
  ["hyphen: 'space'", { hyphen: 'space' }],
  ["specialChars: 'remove'", { specialChars: 'remove' }],
  ['preset: ascii', { preset: 'ascii' }],
  ['preset: email', { preset: 'email' }],
  ['preset: strict', { preset: 'strict' }],
];

const nameInput = document.querySelector<HTMLInputElement>('#name');
const strategySelect = document.querySelector<HTMLSelectElement>('#strategy');

function renderTable(id: string, rows: [string, string][]): void {
  const table = document.querySelector(`#${id}`);
  if (!table) return;
  table.replaceChildren(
    ...rows.map(([label, value]) => {
      const row = document.createElement('tr');
      const head = document.createElement('th');
      const cell = document.createElement('td');
      head.textContent = label;
      cell.textContent = value;
      row.append(head, cell);
      return row;
    }),
  );
}

function render(): void {
  const name = nameInput?.value ?? '';
  const strategy = (strategySelect?.value ?? 'dictionary') as SplitStrategy;
  const pretty = formatName(name, 'capitalizeName');

  renderTable(
    'formats',
    FORMATS.map((format) => [format, formatName(name, format)]),
  );
  renderTable(
    'normalized',
    NORMALIZERS.map(([label, options]) => [label, normalizeName(pretty, options)]),
  );
  renderTable('split', Object.entries(splitName(pretty, { strategy })));
}

nameInput?.addEventListener('input', render);
strategySelect?.addEventListener('change', render);
render();
