import { Box, Stack, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';
import { useMessages } from '../messages';
import Code, { type CodeProps } from './Code';
import CopyButton from './CopyButton';

type Props = {
  label: string;
  value: string;
  code: CodeProps;
  action?: ReactNode;
  sx?: SxProps<Theme>;
};

export default function ResultRow({ label, value, code, action, sx }: Props) {
  const t = useMessages();

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={[
        {
          alignItems: 'flex-start',
          py: 1.5,
          borderTop: 1,
          borderColor: 'divider',
          '&:first-of-type': { borderTop: 0, pt: 0.5 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          component="p"
          sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: '0.02em' }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: '1.05rem',
            fontWeight: 500,
            overflowWrap: 'anywhere',
            color: value ? 'text.primary' : 'text.disabled',
            fontStyle: value ? 'normal' : 'italic',
          }}
        >
          {value || t.empty}
        </Typography>
        <Code {...code} sx={{ mt: 0.25 }} />
      </Box>
      {action}
      <CopyButton text={value} label={label} />
    </Stack>
  );
}
