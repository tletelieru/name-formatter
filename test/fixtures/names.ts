export interface SplitFixture {
  input: string;
  givenNames: string;
  surnames: string;
  firstName: string;
  middleName: string;
  firstSurname: string;
  secondSurname: string;
}

const fixture = (
  input: string,
  firstName: string,
  middleName: string,
  firstSurname: string,
  secondSurname: string,
): SplitFixture => ({
  input,
  givenNames: [firstName, middleName].filter(Boolean).join(' '),
  surnames: [firstSurname, secondSurname].filter(Boolean).join(' '),
  firstName,
  middleName,
  firstSurname,
  secondSurname,
});

export const defaultSplitFixtures: SplitFixture[] = [
  fixture('Juan Soto', 'Juan', '', 'Soto', ''),
  fixture('Juan Soto Rojas', 'Juan', '', 'Soto', 'Rojas'),
  fixture('Juan Pablo Soto Rojas', 'Juan', 'Pablo', 'Soto', 'Rojas'),
  fixture('Ana María Isabel Soto Rojas', 'Ana', 'María Isabel', 'Soto', 'Rojas'),
  fixture('Juan de la Fuente Rojas', 'Juan', '', 'de la Fuente', 'Rojas'),
  fixture('Juan Soto de la Fuente', 'Juan', '', 'Soto', 'de la Fuente'),
  fixture(
    'María de los Ángeles Matus de la Parra',
    'María de los Ángeles',
    '',
    'Matus de la Parra',
    '',
  ),
  fixture(
    'María de los Ángeles Matus de la Parra Sevilla',
    'María de los Ángeles',
    '',
    'Matus de la Parra',
    'Sevilla',
  ),
  fixture('Maria del Carmen Soto Rojas', 'Maria del Carmen', '', 'Soto', 'Rojas'),
  fixture('José de la Cruz Pérez Soto', 'José de la Cruz', '', 'Pérez', 'Soto'),
  fixture('María José Soto Rojas', 'María José', '', 'Soto', 'Rojas'),
  fixture('María José Isabel Soto Rojas', 'María José', 'Isabel', 'Soto', 'Rojas'),
  fixture('Maria Jose Soto', 'Maria Jose', '', 'Soto', ''),
  fixture('José María Pérez Soto', 'José María', '', 'Pérez', 'Soto'),
  fixture('María Jesús Rojas Vera', 'María Jesús', '', 'Rojas', 'Vera'),
  fixture('Juan José Soto Rojas', 'Juan', 'José', 'Soto', 'Rojas'),
  fixture('Pedro Pérez-Cotapos Soto', 'Pedro', '', 'Pérez-Cotapos', 'Soto'),
  fixture('Pedro Soto Pérez - Cotapos', 'Pedro', '', 'Soto', 'Pérez-Cotapos'),
  fixture("Bernardo O'Higgins Riquelme", 'Bernardo', '', "O'Higgins", 'Riquelme'),
  fixture('José Ortega y Gasset', 'José', '', 'Ortega y Gasset', ''),
  fixture('Josep Puig i Cadafalch', 'Josep', '', 'Puig i Cadafalch', ''),
  fixture('Anna Puig i Cadafalch Soler', 'Anna', '', 'Puig i Cadafalch', 'Soler'),
  fixture('João da Silva Santos', 'João', '', 'da Silva', 'Santos'),
  fixture('Maria das Dores Ferreira dos Santos', 'Maria', 'das Dores', 'Ferreira', 'dos Santos'),
  fixture('Ludwig van der Rohe Mies', 'Ludwig', '', 'van der Rohe', 'Mies'),
  fixture('Madonna', 'Madonna', '', '', ''),
  fixture('', '', '', '', ''),
];

export const capitalizeNameFixtures: [string, string][] = [
  ['MARÍA DE LOS ÁNGELES MATUS DE LA PARRA', 'María de los Ángeles Matus de la Parra'],
  ['de la fuente rojas', 'De la Fuente Rojas'],
  ["bernardo o'higgins", "Bernardo O'Higgins"],
  ['pedro PÉREZ-COTAPOS', 'Pedro Pérez-Cotapos'],
  ['ronald mcdonald', 'Ronald McDonald'],
  ['ewan macgregor', 'Ewan MacGregor'],
  ['maría macías machado', 'María Macías Machado'],
  ['JOSÉ ORTEGA Y GASSET', 'José Ortega y Gasset'],
  ['JOSEP PUIG I CADAFALCH', 'Josep Puig i Cadafalch'],
  ['joão dos santos', 'João dos Santos'],
  ['juan de', 'Juan De'],
];
