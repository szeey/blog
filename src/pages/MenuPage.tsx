import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useTheme } from '@mui/material/styles';
// MenuContext에서 useMenu 훅을 import 합니다.
import { useMenu } from '../contexts/MenuContext';

// 더 이상 props를 받을 필요가 없으므로 interface를 제거합니다.
const MenuPage = () => {
  const theme = useTheme();
  // Context에서 팝업을 닫는 함수를 직접 가져옵니다.
  const { closeMenu } = useMenu();

  return (
    <Box sx={{ width: '100%', p: 2, pt: 4 }}>
      {/* 팝업을 닫기 편하도록 상단에 핸들바 모양의 UI를 추가합니다. */}
      <Box
        onClick={closeMenu}
        sx={{
          width: 40,
          height: 5,
          backgroundColor: theme.palette.divider,
          borderRadius: 3,
          position: 'absolute',
          top: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
        }}
      />

      <List>
        {/* 메뉴 항목 클릭 시 context의 closeMenu 함수를 호출하여 팝업을 닫습니다. */}
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/about" onClick={closeMenu}>
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/posts" onClick={closeMenu}>
            <ListItemIcon>
              <ArticleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default MenuPage;
