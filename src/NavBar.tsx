import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const NavBar = () => {
  const theme = useTheme();

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
      <Toolbar>
        <Typography variant="body2" sx={{ p: 1, color: 'text.secondary' }}>
          메뉴
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;