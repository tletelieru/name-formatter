import { Box, Container, CssBaseline, Grid, Stack, ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'react';
import FormatCard from './components/FormatCard';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import NameInput, { EXAMPLES } from './components/NameInput';
import NormalizeSection from './components/NormalizeSection';
import SplitCard from './components/SplitCard';
import { useColorMode } from './preferences';
import { createAppTheme } from './theme';

export default function App() {
  const mode = useColorMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const [name, setName] = useState(EXAMPLES[0] ?? '');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: (t) =>
            `radial-gradient(1200px 480px at 50% -120px, ${
              t.palette.mode === 'dark' ? 'rgba(142,161,255,0.14)' : 'rgba(59,79,228,0.10)'
            }, transparent 70%)`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
          <Stack spacing={{ xs: 3, md: 4 }}>
            <Header />
            <Hero />
            <Box component="main">
              <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid size={12}>
                  <NameInput value={name} onChange={setName} />
                </Grid>
                <Grid size={12}>
                  <FormatCard name={name} />
                </Grid>
                <Grid size={12}>
                  <SplitCard name={name} />
                </Grid>
                <NormalizeSection name={name} />
              </Grid>
            </Box>
            <Footer />
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
