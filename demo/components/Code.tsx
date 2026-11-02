import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { MONO } from '../theme';

export type CodeProps = { fn: string; args?: string; prefix?: string; suffix?: string };

export default function Code({
  fn,
  args,
  prefix,
  suffix,
  sx,
}: CodeProps & { sx?: SxProps<Theme> }) {
  return (
    <Box
      component="code"
      sx={[
        {
          display: 'block',
          fontFamily: MONO,
          fontSize: '0.75rem',
          lineHeight: 1.6,
          color: 'text.secondary',
          overflowWrap: 'anywhere',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {prefix}
      <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
        {fn}
      </Box>
      {args !== undefined && `(${args})`}
      {suffix}
    </Box>
  );
}
