import {
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMessages } from '../messages';
import { locales, setColorMode, setLocale, useColorMode, useLocale } from '../preferences';
import type { Locale } from '../preferences';
import { AppIcon, MoonIcon, SunIcon } from './icons';

export default function Header() {
  const t = useMessages();
  const locale = useLocale();
  const mode = useColorMode();
  const modeLabel = mode === 'dark' ? t.toLight : t.toDark;

  return (
    <Stack component="header" direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <AppIcon sx={{ fontSize: 36 }} />
      <Typography component="p" sx={{ fontWeight: 700, letterSpacing: '-0.02em', flexGrow: 1 }}>
        name-formatter
      </Typography>
      <ToggleButtonGroup
        exclusive
        size="small"
        aria-label={t.language}
        value={locale}
        onChange={(_, next: Locale | null) => {
          if (next) setLocale(next);
        }}
      >
        {locales.map((option) => (
          <ToggleButton key={option} value={option} sx={{ px: 1.25, py: 0.4, fontWeight: 700 }}>
            {option.toUpperCase()}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Tooltip title={modeLabel}>
        <IconButton
          aria-label={modeLabel}
          onClick={() => setColorMode(mode === 'dark' ? 'light' : 'dark')}
        >
          {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
