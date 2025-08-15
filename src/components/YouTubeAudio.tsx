import React from 'react';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1) || null;
    }
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      return v || null;
    }
    return null;
  } catch {
    return null;
  }
}

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const previous = document.getElementById('youtube-iframe-api');
    if (previous) {
      const check = () => {
        if (window.YT && window.YT.Player) resolve();
        else setTimeout(check, 50);
      };
      check();
      return;
    }
    const tag = document.createElement('script');
    tag.id = 'youtube-iframe-api';
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    const original = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (original) original();
      resolve();
    };
  });
}

export interface YouTubeAudioHandle {
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number) => void;
}

export default function YouTubeAudio({ url, playing, onReady, onEnded }: { url: string; playing: boolean; onReady?: (handle: YouTubeAudioHandle) => void; onEnded?: () => void }) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const playerRef = React.useRef<any>(null);
  const videoId = extractYouTubeId(url);
  const desiredPlayRef = React.useRef<boolean>(playing);

  React.useEffect(() => {
    desiredPlayRef.current = playing;
    const player = playerRef.current;
    if (!player) return;
    if (playing) {
      try {
        player.playVideo();
      } catch {
        try {
          player.mute();
          player.playVideo();
          setTimeout(() => { try { player.unMute(); } catch {} }, 200);
        } catch {}
      }
    } else {
      player.pauseVideo();
    }
  }, [playing]);

  React.useEffect(() => {
    let destroyed = false;
    if (!videoId) return;
    (async () => {
      await loadYouTubeAPI();
      if (destroyed) return;
      if (!containerRef.current) return;
      if (playerRef.current) {
        try {
          playerRef.current.loadVideoById(videoId);
          if (desiredPlayRef.current) playerRef.current.playVideo();
          else playerRef.current.pauseVideo();
        } catch {
          // ignore
        }
        return;
      }
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '0',
        width: '0',
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            try {
              const iframe = playerRef.current.getIframe?.();
              if (iframe) {
                iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
                // Keep a minimal footprint but not 0x0 to avoid some autoplay blocks in older browsers
                iframe.style.position = 'absolute';
                iframe.style.width = '1px';
                iframe.style.height = '1px';
                iframe.style.left = '-9999px';
                iframe.style.top = '0';
              }
            } catch {}
            if (onReady) {
              onReady({
                getCurrentTime: () => (playerRef.current?.getCurrentTime?.() ?? 0),
                getDuration: () => (playerRef.current?.getDuration?.() ?? 0),
                seekTo: (s: number) => { try { playerRef.current?.seekTo?.(s, true); } catch {} },
              });
            }
            if (desiredPlayRef.current) {
              try {
                playerRef.current.playVideo();
              } catch {
                try {
                  playerRef.current.mute();
                  playerRef.current.playVideo();
                  setTimeout(() => { try { playerRef.current.unMute(); } catch {} }, 200);
                } catch {}
              }
            }
          },
          onStateChange: (e: any) => {
            if (e?.data === 0 && onEnded) onEnded();
          },
        },
      });
    })();
    return () => {
      destroyed = true;
      const player = playerRef.current;
      if (player && player.destroy) {
        try { player.destroy(); } catch {}
      }
      playerRef.current = null;
    };
  }, [videoId]);

  return (
    <div
      aria-hidden
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0 }}
    >
      <div ref={containerRef} />
    </div>
  );
}


