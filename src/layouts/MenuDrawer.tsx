import Drawer from '@mui/material/Drawer';
import { useMenu } from '../contexts/MenuContext';
import MenuPage from '../pages/MenuPage';

const MenuDrawer = () => {
  const { isMenuOpen, closeMenu } = useMenu();

  return (
    <Drawer
      anchor="bottom"
      open={isMenuOpen}
      onClose={closeMenu}
      ModalProps={{
        keepMounted: true,
        disableScrollLock: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        },
      }}
    >
      <MenuPage />
    </Drawer>
  );
};

export default MenuDrawer;
