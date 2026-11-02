import {
  alpha,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { normalizeName } from '../../src';
import { call, objectLiteral } from '../code';
import { useMessages } from '../messages';
import {
  COMMON_RULES,
  DEFAULT_STATE,
  ENYES,
  PRESETS,
  RULES,
  toOptions,
  type NormalizeState,
} from '../normalizeState';
import Code from './Code';
import CopyButton from './CopyButton';
import OptionGroup from './OptionGroup';
import ResultRow from './ResultRow';
import Section from './Section';

export default function NormalizeSection({ name }: { name: string }) {
  const t = useMessages();
  const n = t.normalize;
  const [state, setState] = useState<NormalizeState>(DEFAULT_STATE);
  const options = useMemo(() => toOptions(state), [state]);
  const result = normalizeName(name, options);
  const code = call('normalizeName', 'name', objectLiteral(options));
  const autoOption = { value: 'auto' as const, label: n.auto };
  const set = <K extends keyof NormalizeState>(key: K) => {
    return (value: NormalizeState[K]) => setState((previous) => ({ ...previous, [key]: value }));
  };
  const ruleOptions = [autoOption, ...RULES.map((value) => ({ value, label: value, code: true }))];

  const rules = useMemo(
    () =>
      COMMON_RULES.map(({ id, state: partial }) => {
        const preset = toOptions({ ...DEFAULT_STATE, ...partial });
        return { id, partial, code: objectLiteral(preset), value: normalizeName(name, preset) };
      }),
    [name],
  );
  const activeCode = objectLiteral(options);

  return (
    <>
      <Grid size={{ xs: 12, lg: 6 }}>
        <Section title={n.title} subtitle={n.subtitle}>
          <Box
            sx={(theme) => ({
              p: 2,
              borderRadius: 1,
              border: 1,
              borderColor: alpha(theme.palette.primary.main, 0.3),
              bgcolor: alpha(
                theme.palette.primary.main,
                theme.palette.mode === 'dark' ? 0.1 : 0.05,
              ),
            })}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography
                  variant="caption"
                  component="p"
                  sx={{ color: 'text.secondary', fontWeight: 600 }}
                >
                  {n.result}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.2rem', sm: '1.4rem' },
                    fontWeight: 600,
                    overflowWrap: 'anywhere',
                    color: result ? 'text.primary' : 'text.disabled',
                    fontStyle: result ? 'normal' : 'italic',
                  }}
                >
                  {result || t.empty}
                </Typography>
              </Box>
              <CopyButton text={result} label={n.result} />
            </Stack>
            <Code {...code} sx={{ mt: 1 }} />
          </Box>

          <OptionGroup
            label={n.preset}
            value={state.preset}
            options={PRESETS.map((value) => ({
              value,
              label: value === 'none' ? n.none : value,
              code: value !== 'none',
            }))}
            onChange={set('preset')}
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <OptionGroup
                label="stripAccents"
                value={state.stripAccents}
                options={[autoOption, { value: 'on', label: n.on }, { value: 'off', label: n.off }]}
                onChange={set('stripAccents')}
              />
              <FormControlLabel
                sx={{ mt: 0.5, ml: -0.5 }}
                control={
                  <Switch
                    size="small"
                    checked={state.keepEnye}
                    onChange={(event) => set('keepEnye')(event.target.checked)}
                  />
                }
                label={<Typography variant="body2">{n.keepEnye}</Typography>}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <OptionGroup
                label="enye"
                value={state.enye}
                options={[
                  autoOption,
                  ...ENYES.map((value) => ({ value, label: value, code: true })),
                ]}
                onChange={set('enye')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <OptionGroup
                label="apostrophe"
                value={state.apostrophe}
                options={ruleOptions}
                onChange={set('apostrophe')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <OptionGroup
                label="hyphen"
                value={state.hyphen}
                options={ruleOptions}
                onChange={set('hyphen')}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <OptionGroup
                label="specialChars"
                value={state.specialChars}
                options={ruleOptions}
                onChange={set('specialChars')}
              />
            </Grid>
          </Grid>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{ alignItems: { xs: 'flex-start', sm: 'center' } }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1 }}>
              {n.autoHint}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              disabled={activeCode === '{}'}
              onClick={() => setState(DEFAULT_STATE)}
            >
              {n.reset}
            </Button>
          </Stack>
        </Section>
      </Grid>

      <Grid size={{ xs: 12, lg: 6 }}>
        <Section title={t.rules.title} subtitle={t.rules.subtitle}>
          <Box>
            {rules.map((rule) => (
              <ResultRow
                key={rule.id}
                label={t.rules.labels[rule.id]}
                value={rule.value}
                code={call('normalizeName', 'name', rule.code)}
                action={
                  <Button
                    size="small"
                    variant={rule.code === activeCode ? 'contained' : 'text'}
                    onClick={() => setState({ ...DEFAULT_STATE, ...rule.partial })}
                    sx={{ minWidth: 0, px: 1.25 }}
                  >
                    {t.rules.apply}
                  </Button>
                }
              />
            ))}
          </Box>
        </Section>
      </Grid>
    </>
  );
}
