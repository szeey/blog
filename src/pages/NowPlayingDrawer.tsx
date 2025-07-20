import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const NowPlayingDrawer = () => {
  const {
    isPlayerOpen,
    isPlaying,
    currentTrack,
    closePlayer,
    togglePlay,
    playNext,
    playPrevious,
  } = useMusicPlayer();

  if (!currentTrack) return null;

  return (
    <Drawer
      anchor="bottom"
      open={isPlayerOpen}
      onClose={closePlayer}
      sx={{
        '& .MuiDrawer-paper': {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        },
      }}
    >
      <Box
        component="img"
        src={currentTrack.albumArt}
        alt={`${currentTrack.title} 앨범 아트`}
        sx={{
          width: 150,
          height: 150,
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          transition: 'transform 0.3s ease-in-out',
          transform: isPlaying ? 'scale(1)' : 'scale(0.95)',
        }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" component="div" noWrap>
          {currentTrack.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" noWrap>
          {currentTrack.artist}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <IconButton aria-label="이전 곡" onClick={playPrevious}>
            <SkipPreviousIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton aria-label="재생/일시정지" onClick={togglePlay}>
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: 40 }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: 40 }} />
            )}
          </IconButton>
          <IconButton aria-label="다음 곡" onClick={playNext}>
            <SkipNextIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NowPlayingDrawer;