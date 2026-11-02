import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type Props = { title: string; subtitle: string; children: ReactNode };

export default function Section({ title, subtitle, children }: Props) {
  return (
    <Box
      component="section"
      sx={{
        p: { xs: 2, sm: 3 },
        height: '100%',
        borderRadius: 1.5,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Stack spacing={2.5}>
        <div>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </div>
        {children}
      </Stack>
    </Box>
  );
}
