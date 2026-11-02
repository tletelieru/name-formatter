import { IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
import { useMessages } from '../messages';
import { REPO_URL } from './Hero';
import { GitHubIcon } from './icons';

const SITE_URL = 'https://tletelieru.github.io/tletelieru/';

export default function Footer() {
  const t = useMessages().footer;

  return (
    <Stack
      component="footer"
      direction="row"
      spacing={0.5}
      sx={{ alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', pt: 2 }}
    >
      <Typography variant="body2" color="text.secondary">
        {t.developedBy}{' '}
        <Link href={SITE_URL} target="_blank" rel="noreferrer">
          tletelieru
        </Link>
        {' · '}
        <Link
          href={`${REPO_URL}/blob/main/LICENSE`}
          target="_blank"
          rel="noreferrer"
          color="inherit"
        >
          {t.license}
        </Link>
      </Typography>
      <Tooltip title="GitHub">
        <IconButton
          size="small"
          aria-label="GitHub"
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
