import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
// MenuContext에서 useMenu 훅을 import 합니다.
import { useMenu } from '../contexts/MenuContext';

// 더 이상 props를 받을 필요가 없으므로 interface를 제거합니다.
const NavBar = () => {
  const theme = useTheme();
  // Context에서 메뉴를 여는 함수를 직접 가져옵니다.
  const { openMenu } = useMenu();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 'auto',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto',
        borderRadius: '32px',
        boxShadow: theme.shadows[8],
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(45, 45, 45, 0.75)'
            : 'rgba(252, 252, 252, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ px: 2 }}>
        <Box
          sx={{
            width: '100%',
            minWidth: 180,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* 메뉴 버튼 클릭 시 context의 openMenu 함수를 직접 호출합니다. */}
          <IconButton onClick={openMenu} aria-label="메뉴 열기">
            <MenuIcon />
          </IconButton>

          <IconButton component={RouterLink} to="/" aria-label="홈으로 이동">
            <HomeOutlinedIcon />
          </IconButton>

          <Box sx={{ width: 40, height: 40 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
