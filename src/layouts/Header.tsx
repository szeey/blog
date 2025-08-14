import Box from '@mui/material/Box';
import logoImage from '../assets/logo.png';

export default function Header() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Box
        onClick={handleScrollToTop}
        aria-label="Scroll to the top"
        sx={{
          cursor: 'pointer',
          lineHeight: 0,
        }}
      >
        <Box
          component="img"
          src={logoImage}
          alt="Main blog's logo"
          sx={(theme) => ({
            height: 60,
            width: 'auto',
            filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
            transition: theme.transitions.create(['transform', 'filter'], {
              duration: theme.transitions.duration.shorter,
            }),
            '&:hover': { transform: 'scale(1.1)' },
          })}
        />
      </Box>
    </Box>
  );
};