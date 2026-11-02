import { Box, Chip, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useMessages } from '../messages';
import { CloseIcon } from './icons';

export const EXAMPLES = [
  'MARÍA DE LOS ÁNGELES MATUS DE LA PARRA SEVILLA',
  'juan de la fuente rojas',
  "María José Pérez-Cotapos O'Higgins",
  'José Ortega y Gasset',
  'Ñuñoa Muñoz',
];

type Props = { value: string; onChange: (value: string) => void };

export default function NameInput({ value, onChange }: Props) {
  const t = useMessages().input;

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 1.5,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 12px 40px rgba(0,0,0,0.35)'
            : '0 12px 40px rgba(59,79,228,0.08)',
      }}
    >
      <Stack spacing={2}>
        <TextField
          fullWidth
          label={t.label}
          placeholder={t.placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
          slotProps={{
            htmlInput: { spellCheck: false },
            input: {
              sx: { fontSize: { xs: '1.1rem', sm: '1.35rem' }, fontWeight: 500 },
              endAdornment: value ? (
                <InputAdornment position="end">
                  <IconButton aria-label={t.clear} edge="end" onClick={() => onChange('')}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
          }}
        />
        <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mr: 0.5 }}>
            {t.examples}
          </Typography>
          {EXAMPLES.map((example) => (
            <Chip
              key={example}
              label={example}
              size="small"
              variant={example === value ? 'filled' : 'outlined'}
              color={example === value ? 'primary' : 'default'}
              onClick={() => onChange(example)}
              sx={{ maxWidth: '100%' }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
