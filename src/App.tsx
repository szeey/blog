import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { lightTheme, darkTheme } from './assets/theme';
import { MenuProvider, useMenu } from './contexts/MenuContext';
import { MusicPlayerProvider, useMusicPlayer } from './contexts/MusicPlayerContext';
import MenuDrawer from './header/MenuDrawer';
import NowPlayingDrawer from './pages/NowPlayingDrawer';

import Header from './header/Header';
import NavBar from './header/NavBar';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import PostsPage from './pages/PostsPage';

const MainContent = () => {
  const { isMenuOpen } = useMenu();
  const { isPlayerOpen } = useMusicPlayer();
  const isPopupOpen = isMenuOpen || isPlayerOpen;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        pt: '100px',
        pb: '120px',
        boxSizing: 'border-box',
        transition: 'filter 0.3s ease-in-out',
        filter: isPopupOpen ? 'blur(4px) brightness(0.7)' : 'none',
      }}
    >
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </Box>
  );
};

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MusicPlayerProvider>
        <MenuProvider>
          <Router>
            <Header />
            <MainContent />
            <NavBar />
            <MenuDrawer />
            <NowPlayingDrawer />
          </Router>
        </MenuProvider>
      </MusicPlayerProvider>
    </ThemeProvider>
  );
}

export default App;
