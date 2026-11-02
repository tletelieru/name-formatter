import { alpha, Box, Grid, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { splitName, type SplitName, type SurnameConvention } from '../../src';
import { objectLiteral } from '../code';
import { columnRow, twoColumns } from '../columns';
import { useMessages, type ShownStrategy } from '../messages';
import { MONO } from '../theme';
import Code from './Code';
import OptionGroup from './OptionGroup';
import ResultRow from './ResultRow';
import Section from './Section';

const STRATEGIES: ShownStrategy[] = ['dictionary', 'particle', 'lastTwo'];
const CONVENTIONS: SurnameConvention[] = ['double', 'single'];
const FIELDS: (keyof SplitName)[] = [
  'givenNames',
  'surnames',
  'firstName',
  'middleName',
  'firstSurname',
  'secondSurname',
];
const PARTS: { key: keyof SplitName; tone: 'primary' | 'secondary' }[] = [
  { key: 'firstName', tone: 'primary' },
  { key: 'middleName', tone: 'primary' },
  { key: 'firstSurname', tone: 'secondary' },
  { key: 'secondSurname', tone: 'secondary' },
];

export default function SplitCard({ name }: { name: string }) {
  const t = useMessages().split;
  const [strategy, setStrategy] = useState<ShownStrategy>('dictionary');
  const [convention, setConvention] = useState<SurnameConvention>('double');

  const options = useMemo(
    () => ({
      strategy: strategy === 'dictionary' ? undefined : strategy,
      convention: convention === 'double' ? undefined : convention,
    }),
    [strategy, convention],
  );
  const parts = useMemo(() => splitName(name, options), [name, options]);
  const optionsCode = objectLiteral(options);
  const args = optionsCode === '{}' ? 'name' : `name, ${optionsCode}`;
  const shown = PARTS.filter(({ key }) => parts[key]);

  return (
    <Section title={t.title} subtitle={t.subtitle}>
      <Grid container spacing={{ xs: 2.5, md: 4 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2.5}>
            <Stack spacing={1.5}>
              <OptionGroup
                label={t.strategy}
                value={strategy}
                fullWidth
                options={STRATEGIES.map((value) => ({ value, label: value, code: true }))}
                onChange={setStrategy}
              />
              <Typography variant="body2" color="text.secondary" sx={{ minHeight: '2.5em' }}>
                {t.strategies[strategy]}
              </Typography>
              <OptionGroup
                label={t.convention}
                value={convention}
                fullWidth
                options={CONVENTIONS.map((value) => ({ value, label: t.conventions[value] }))}
                onChange={setConvention}
              />
            </Stack>

            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.text.primary, 0.04),
              }}
            >
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, minHeight: 52 }}>
                {shown.map(({ key, tone }) => (
                  <Box
                    key={key}
                    sx={(theme) => ({
                      px: 1.25,
                      py: 0.5,
                      borderRadius: 1,
                      border: 1,
                      borderColor: alpha(theme.palette[tone].main, 0.4),
                      bgcolor: alpha(
                        theme.palette[tone].main,
                        theme.palette.mode === 'dark' ? 0.16 : 0.08,
                      ),
                    })}
                  >
                    <Typography sx={{ fontWeight: 600, lineHeight: 1.3 }}>{parts[key]}</Typography>
                    <Typography
                      variant="caption"
                      component="p"
                      sx={{
                        color: `${tone}.main`,
                        fontWeight: 600,
                        fontFamily: MONO,
                        fontSize: '0.7rem',
                      }}
                    >
                      {key}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <Code prefix="const parts = " fn="splitName" args={args} sx={{ mt: 1.5 }} />
            </Box>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={twoColumns}>
            {FIELDS.map((field, index) => (
              <ResultRow
                key={field}
                label={t.fields[field]}
                value={parts[field]}
                code={{ fn: 'parts', suffix: `.${field}` }}
                sx={columnRow(index)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
