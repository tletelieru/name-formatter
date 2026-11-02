import { Box } from '@mui/material';
import { formatName, type NameFormat } from '../../src';
import { call, str } from '../code';
import { useMessages } from '../messages';
import { columnRow, twoColumns } from '../columns';
import ResultRow from './ResultRow';
import Section from './Section';

const FORMATS: NameFormat[] = ['capitalizeName', 'capitalize', 'upper', 'lower'];

export default function FormatCard({ name }: { name: string }) {
  const t = useMessages().format;

  return (
    <Section title={t.title} subtitle={t.subtitle}>
      <Box sx={twoColumns}>
        {FORMATS.map((format, index) => (
          <ResultRow
            key={format}
            label={t.labels[format]}
            value={formatName(name, format)}
            code={call('formatName', 'name', str(format))}
            sx={columnRow(index)}
          />
        ))}
      </Box>
    </Section>
  );
}
