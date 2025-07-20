import { createContext, useState, useContext, useMemo, type ReactNode } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  albumArt: string;
}

// mockup data
const mockTracks: Track[] = [
  {
    id: 1,
    title: '첫 번째 노래',
    artist: '아티스트 A',
    albumArt: 'https://source.unsplash.com/random/500x500?music&sig=1',
  },
  {
    id: 2,
    title: '두 번째 노래',
    artist: '아티스트 B',
    albumArt: 'https://source.unsplash.com/random/500x500?music&sig=2',
  },
  {
    id: 3,
    title: '세 번째 노래',
    artist: '아티스트 C',
    albumArt: 'https://source.unsplash.com/random/500x500?music&sig=3',
  },
];

interface MusicPlayerContextType {
  isPlayerOpen: boolean;
  isPlaying: boolean;
  currentTrack: Track | null;
  openPlayer: () => void;
  closePlayer: () => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
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
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const openPlayer = () => setIsPlayerOpen(true);
  const closePlayer = () => setIsPlayerOpen(false);
  const togglePlay = () => setIsPlaying(!isPlaying);

  const playNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % mockTracks.length);
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + mockTracks.length) % mockTracks.length);
  };

  const currentTrack = useMemo(() => mockTracks[currentTrackIndex], [currentTrackIndex]);

  const value = {
    isPlayerOpen,
    isPlaying,
    currentTrack,
    openPlayer,
    closePlayer,
    togglePlay,
    playNext,
    playPrevious,
  };

  return <MusicPlayerContext.Provider value={value}>{children}</MusicPlayerContext.Provider>;
};