import { useCallback } from 'react';

export const useKanaAudio = () => {
  const playKana = useCallback((romanji: string) => {
    const audio = new Audio(`/sounds/kana/${romanji}.mp3`);
    audio.play().catch(() => {
      // Silently fail if audio file not found
    });
  }, []);

  return { playKana };
};
