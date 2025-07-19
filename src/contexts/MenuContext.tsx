import { createContext, useState, useContext, type ReactNode } from 'react';

// Context에 담길 값들의 타입 정의
interface MenuContextType {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

// Context 생성. 초기값은 undefined로 설정합니다.
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Context를 사용하기 위한 커스텀 훅
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

// Provider 컴포넌트. 앱의 최상단에서 모든 자식들에게 context 값을 제공합니다.
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const value = { isMenuOpen, openMenu, closeMenu };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
