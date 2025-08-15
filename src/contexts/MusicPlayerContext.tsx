import { createContext, useState, useContext, useMemo, useEffect, type ReactNode } from 'react';
import { loadSongs, type LoadedSong } from '../songs/loadSongs';

type Track = LoadedSong;

// fallback mock when no songs available
const fallbackTracks: Track[] = [];

interface MusicPlayerContextType {
  isPlayerOpen: boolean;
  isPlaying: boolean;
  tracks: Track[];
  currentTrack: Track | null;
  currentIndex: number;
  openPlayer: () => void;
  closePlayer: () => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  selectTrack: (index: number) => void;
  isShuffling: boolean;
  toggleShuffle: () => void;
  repeatMode: 'off' | 'all' | 'one';
  cycleRepeatMode: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(fallbackTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const loaded = await loadSongs();
        if (mounted && loaded.length > 0) {
          setTracks(loaded);
          setCurrentTrackIndex(0);
        }
      } catch {
        // ignore and keep fallback
      }
    })();
    return () => { mounted = false; };
  }, []);

  const openPlayer = () => setIsPlayerOpen(true);
  const closePlayer = () => setIsPlayerOpen(false);
  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const togglePlay = () => setIsPlaying((p) => !p);

  const playNext = () => {
    setCurrentTrackIndex((prevIndex) => (tracks.length ? (prevIndex + 1) % tracks.length : 0));
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prevIndex) => (tracks.length ? (prevIndex - 1 + tracks.length) % tracks.length : 0));
  };

  const selectTrack = (index: number) => {
    if (!tracks.length) return;
    const safe = ((index % tracks.length) + tracks.length) % tracks.length;
    setCurrentTrackIndex(safe);
  };

  const toggleShuffle = () => setIsShuffling((s) => !s);
  const cycleRepeatMode = () => setRepeatMode((m) => (m === 'off' ? 'all' : m === 'all' ? 'one' : 'off'));

  const currentTrack = useMemo(() => (tracks.length ? tracks[currentTrackIndex] : null), [tracks, currentTrackIndex]);

  const value = {
    isPlayerOpen,
    isPlaying,
    tracks,
    currentTrack,
    currentIndex: currentTrackIndex,
    openPlayer,
    closePlayer,
    play,
    pause,
    togglePlay,
    playNext,
    playPrevious,
    selectTrack,
    isShuffling,
    toggleShuffle,
    repeatMode,
    cycleRepeatMode,
  };

  return <MusicPlayerContext.Provider value={value}>{children}</MusicPlayerContext.Provider>;
};