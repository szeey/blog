import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { lightTheme, darkTheme } from './assets/theme';
import NavBar from './NavBar';
import MainPage from './MainPage';
import Header from './Header';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ pb: '120px' }}>
        <MainPage />
      </Box>
      <NavBar />
    </ThemeProvider>
  );
}

export default App;
