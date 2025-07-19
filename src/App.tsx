import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { lightTheme, darkTheme } from './assets/theme';

// Context Provider와 신규 컴포넌트를 import 합니다.
import { MenuProvider, useMenu } from './contexts/MenuContext';
import MenuDrawer from './header/MenuDrawer';

import Header from './header/Header';
import NavBar from './header/NavBar';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import PostsPage from './pages/PostsPage';

// 메인 컨텐츠 영역을 별도 컴포넌트로 분리하여 App.tsx를 더 깔끔하게 유지합니다.
const MainContent = () => {
  const { isMenuOpen } = useMenu(); // Context에서 메뉴 상태를 가져옵니다.

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
        // 메뉴가 열려있으면 배경에 블러와 어둡기 효과를 적용합니다.
        filter: isMenuOpen ? 'blur(4px) brightness(0.7)' : 'none',
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
      {/* MenuProvider로 앱 전체를 감싸 Context를 제공합니다. */}
      <MenuProvider>
        <Router>
          <Header />
          <MainContent />
          <NavBar />
          {/* MenuDrawer가 메뉴 팝업의 모든 것을 담당합니다. */}
          <MenuDrawer />
        </Router>
      </MenuProvider>
    </ThemeProvider>
  );
}

export default App;
