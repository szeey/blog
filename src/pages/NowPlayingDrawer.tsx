import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import YouTubeAudio from '../components/YouTubeAudio';
import Slider from '@mui/material/Slider';
import YouTubeIcon from '@mui/icons-material/YouTube';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Divider from '@mui/material/Divider';

const NowPlayingDrawer = () => {
  const {
    isPlayerOpen,
    isPlaying,
    currentTrack,
    closePlayer,
    togglePlay,
    playNext,
    playPrevious,
    tracks,
    selectTrack,
    play,
    pause,
    currentIndex,
    isShuffling,
    toggleShuffle,
    repeatMode,
    cycleRepeatMode,
  } = useMusicPlayer();

  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const playerHandleRef = React.useRef<{ getCurrentTime: () => number; getDuration: () => number; seekTo: (s: number) => void } | null>(null);
  const [openPlaylist, setOpenPlaylist] = React.useState(false);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      const h = playerHandleRef.current;
      if (!h) return;
      const d = h.getDuration();
      const t = h.getCurrentTime();
      if (Number.isFinite(d)) setDuration(d);
      if (Number.isFinite(t)) setCurrentTime(t);
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (isPlayerOpen) setOpenPlaylist(false);
  }, [isPlayerOpen]);

  const handleSeek = (_: Event, value: number | number[]) => {
    const v = Array.isArray(value) ? value[0] : value;
    playerHandleRef.current?.seekTo(v);
  };

  const formatTime = (sec: number) => {
    if (!Number.isFinite(sec)) return '0:00';
    const s = Math.floor(sec);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, '0')}`;
  };

  const formatArtist = (name: string) => {
    if (!name) return name;
    return name.replace(/\s*-\s*Topic\s*$/i, '').trim();
  };

  return (
    <Drawer
      anchor="bottom"
      open={isPlayerOpen}
      onClose={closePlayer}
      ModalProps={{
        keepMounted: true,
        disableScrollLock: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: '0 -20px 60px rgba(0,0,0,0.15)',
          p: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        },
      }}
    >
      {currentTrack?.url && (
        <YouTubeAudio
          url={currentTrack.url}
          playing={isPlaying}
          onReady={(h) => {
            playerHandleRef.current = h;
            setDuration(h.getDuration());
          }}
          onEnded={() => {
            if (repeatMode === 'one') {
              playerHandleRef.current?.seekTo(0);
              play();
              return;
            }
            if (repeatMode === 'all') {
              playNext();
              return;
            }
            if (currentIndex < tracks.length - 1) {
              playNext();
            } else {
              // Repeat off and last track: reset to first and pause (show play icon)
              selectTrack(0);
              pause();
            }
          }}
        />
      )}
      <Box
        onClick={closePlayer}
        sx={(theme) => ({
          width: 40,
          height: 5,
          backgroundColor: theme.palette.divider,
          borderRadius: 3,
          position: 'absolute',
          top: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
        })}
      />
      {currentTrack ? (
        <>
          {!openPlaylist && (
            <>
              <Box
                component="img"
                src={currentTrack.albumArt}
                alt={`${currentTrack.title} 앨범 아트`}
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: 3,
                  boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                  transition: 'transform 0.3s ease-in-out',
                  transform: isPlaying ? 'scale(1)' : 'scale(0.97)',
                }}
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%', maxWidth: 720 }}>
                <Typography variant="h6" component="div" noWrap>
                  {currentTrack.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" noWrap>
                  {formatArtist(currentTrack.artist)}
                </Typography>

                <Box sx={{ width: '100%', px: 2, mt: 2 }}>
                  <Slider
                    size="small"
                    min={0}
                    max={Math.max(1, Math.floor(duration))}
                    value={Math.min(Math.floor(currentTime), Math.floor(duration) || 1)}
                    onChange={handleSeek}
                    aria-label="progress"
                    sx={{
                      color: 'primary.main',
                      height: 4,
                      '& .MuiSlider-track': { border: 'none' },
                      '& .MuiSlider-rail': { opacity: 0.3 },
                      '& .MuiSlider-thumb': {
                        width: 12,
                        height: 12,
                        boxShadow: '0 0 0 6px rgba(0,0,0,0.06)'
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="caption">{formatTime(currentTime)}</Typography>
                    <Typography variant="caption">{formatTime(duration)}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, width: '100%', px: 1 }}>
                  <IconButton aria-label="YouTube로 열기" onClick={() => { if (currentTrack?.url) window.open(currentTrack.url, '_blank', 'noopener,noreferrer'); }}>
                    <YouTubeIcon />
                  </IconButton>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton aria-label="셔플" color={isShuffling ? 'primary' : 'default'} onClick={toggleShuffle}>
                      <ShuffleIcon />
                    </IconButton>
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
                    <IconButton aria-label="반복" color={repeatMode !== 'off' ? 'primary' : 'default'} onClick={cycleRepeatMode}>
                      {repeatMode === 'one' ? <RepeatIcon sx={{ display: 'none' }} /> : null}
                      {repeatMode === 'one' ? <RepeatOneIcon /> : <RepeatIcon />}
                    </IconButton>
                  </Box>
                  <IconButton aria-label="플레이리스트 열기" onClick={() => setOpenPlaylist(true)}>
                    <QueueMusicIcon />
                  </IconButton>
                </Box>
              </Box>
            </>
          )}

          {openPlaylist && (
            <Box sx={{ width: '100%', maxWidth: 720 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, width: '100%' }}>
                <IconButton size="small" onClick={() => setOpenPlaylist(false)} aria-label="뒤로">
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ width: '100%', maxHeight: 280, overflowY: 'auto', px: 1 }}>
                {tracks.map((t, i) => (
                  <React.Fragment key={t.id}>
                    <Box
                      onClick={() => { selectTrack(i); play(); setOpenPlaylist(false); }}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', px: 1, py: 1, borderRadius: 1, backgroundColor: i === currentIndex ? 'action.hover' : 'transparent', '&:hover': { backgroundColor: 'action.hover' } }}
                    >
                      <Box component="img" src={t.albumArt} alt={t.title} sx={{ width: 44, height: 44, borderRadius: 1, objectFit: 'cover' }} />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" noWrap sx={{ fontWeight: i === currentIndex ? 700 : 400 }}>{t.title}</Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {formatArtist(t.artist)}
                        </Typography>
                      </Box>
                    </Box>
                    {i < tracks.length - 1 && <Divider sx={{ my: 0.5 }} />}
                  </React.Fragment>
                ))}
                {tracks.length === 0 && (
                  <Typography variant="body2" color="text.secondary">재생 목록이 비어 있습니다.</Typography>
                )}
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>No songs to play</Typography>
        </Box>
      )}
    </Drawer>
  );
};

export default NowPlayingDrawer;