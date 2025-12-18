'use client';
import clsx from 'clsx';
import { X, Volume2 } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { useKanaAudio } from '@/shared/hooks/useKanaAudio';

interface KanaPreviewProps {
  kana: string;
  romanji: string;
  isOpen: boolean;
  onClose: () => void;
}

const KanaPreview = ({ kana, romanji, isOpen, onClose }: KanaPreviewProps) => {
  const { playKana } = useKanaAudio();

  const handlePlayAudio = useCallback(() => {
    playKana(romanji);
  }, [playKana, romanji]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={clsx(
          'relative bg-[var(--card-color)] rounded-2xl p-8',
          'border border-[var(--border-color)]',
          'shadow-xl animate-in fade-in zoom-in-95 duration-200',
          'min-w-[200px] flex flex-col items-center gap-4'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--secondary-color)] hover:text-[var(--text-color)] transition-colors"
        >
          <X size={20} />
        </button>

        <span className="text-7xl font-medium">{kana}</span>
        <span className="text-2xl text-[var(--secondary-color)]">{romanji}</span>

        <button
          type="button"
          onClick={handlePlayAudio}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-lg',
            'bg-[var(--main-color)]/10 text-[var(--main-color)]',
            'hover:bg-[var(--main-color)]/20 transition-colors'
          )}
        >
          <Volume2 size={20} />
          <span>Play Sound</span>
        </button>
      </div>
    </div>
  );
};

export default KanaPreview;
