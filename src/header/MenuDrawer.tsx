import Drawer from '@mui/material/Drawer';
import { useMenu } from '../contexts/MenuContext';
import MenuPage from '../pages/MenuPage';

/**
 * 메뉴 팝업(Drawer) UI를 담당하는 컴포넌트입니다.
 * useMenu 훅을 통해 스스로 열리고 닫힙니다.
 */
const MenuDrawer = () => {
  const { isMenuOpen, closeMenu } = useMenu();

  return (
    <Drawer
      anchor="bottom"
      open={isMenuOpen}
      onClose={closeMenu}
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
      {/* 이제 MenuPage는 props가 필요 없습니다. */}
      <MenuPage />
    </Drawer>
  );
};

export default MenuDrawer;
