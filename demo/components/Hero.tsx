import { alpha, Box, Button, Stack, Typography } from '@mui/material';
import { useMessages } from '../messages';
import { MONO } from '../theme';
import CopyButton from './CopyButton';
import { GitHubIcon, NpmIcon } from './icons';

export const NPM_URL = 'https://www.npmjs.com/package/@tletelieru/name-formatter';
export const REPO_URL = 'https://github.com/tletelieru/name-formatter';
const INSTALL = 'npm i @tletelieru/name-formatter';

export default function Hero() {
  const t = useMessages();

  return (
    <Stack spacing={2.5} sx={{ alignItems: 'center', textAlign: 'center', pt: { xs: 2, md: 5 } }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.5rem', md: '3.75rem' },
          lineHeight: 1.05,
          background: (theme) =>
            `linear-gradient(120deg, ${theme.palette.text.primary} 35%, ${theme.palette.primary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        name-formatter
      </Typography>
      <Typography
        variant="h6"
        component="p"
        color="text.secondary"
        sx={{ maxWidth: 640, fontWeight: 400, fontSize: { xs: '1.05rem', md: '1.25rem' } }}
      >
        {t.tagline}
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{ alignItems: 'center', width: { xs: '100%', sm: 'auto' }, pt: 1 }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            pl: 2,
            pr: 0.5,
            py: 0.5,
            width: { xs: '100%', sm: 'auto' },
            maxWidth: '100%',
            borderRadius: 1.25,
            border: 1,
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.07),
          }}
        >
          <Box
            component="code"
            sx={{
              fontFamily: MONO,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              flexGrow: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              overflowX: 'auto',
            }}
          >
            <Box component="span" sx={{ color: 'text.secondary', userSelect: 'none' }}>
              ${' '}
            </Box>
            {INSTALL}
          </Box>
          <CopyButton text={INSTALL} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="inherit"
            href={NPM_URL}
            target="_blank"
            rel="noreferrer"
            startIcon={<NpmIcon sx={{ color: '#cb3837' }} />}
            sx={{ borderColor: 'divider' }}
          >
            npm
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            startIcon={<GitHubIcon />}
            sx={{ borderColor: 'divider' }}
          >
            GitHub
          </Button>
        </Stack>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {t.live}
      </Typography>
    </Stack>
  );
}
