'use client';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { useClick } from '@/shared/hooks/useAudio';
import { useRef } from 'react';

interface KanaCellProps {
  kana: string;
  romanji: string;
  isSelected: boolean;
  onToggle: () => void;
  onPreview?: () => void;
}

const LONG_PRESS_DURATION = 500;

const KanaCell = ({
  kana,
  romanji,
  isSelected,
  onToggle,
  onPreview
}: KanaCellProps) => {
  const { playClick } = useClick();
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const handleClick = () => {
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }
    playClick();
    onToggle();
  };

  const handleDoubleClick = () => {
    onPreview?.();
  };

  const handleTouchStart = () => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      onPreview?.();
    }, LONG_PRESS_DURATION);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={clsx(
        'relative w-14 h-18 sm:w-16 sm:h-20 rounded-xl cursor-pointer',
        'bg-[var(--card-color)]/80 backdrop-blur-sm',
        'border-2 border-transparent',
        'hover:border-[var(--main-color)] hover:scale-105',
        'active:scale-95',
        'transition-all duration-200',
        'flex flex-col items-center justify-center gap-0.5',
        'focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/50',
        isSelected && 'bg-[var(--main-color)]/20 border-[var(--main-color)]'
      )}
    >
      {isSelected && (
        <div className="absolute top-1 right-1">
          <Check size={14} className="text-[var(--main-color)]" />
        </div>
      )}
      <span className="text-2xl sm:text-3xl font-medium">{kana}</span>
      <span className="text-xs text-[var(--secondary-color)]">{romanji}</span>
    </button>
  );
};

export default KanaCell;
