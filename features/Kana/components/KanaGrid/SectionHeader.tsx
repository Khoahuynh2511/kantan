'use client';
import clsx from 'clsx';
import { ChevronUp, MousePointer } from 'lucide-react';
import { useClick } from '@/shared/hooks/useAudio';

interface SectionHeaderProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectAll?: () => void;
}

const SectionHeader = ({
  title,
  isExpanded,
  onToggle,
  onSelectAll
}: SectionHeaderProps) => {
  const { playClick } = useClick();

  const handleToggle = () => {
    playClick();
    onToggle();
  };

  const handleSelectAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    onSelectAll?.();
  };

  return (
    <div className="flex items-center justify-between w-full py-2">
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-2 text-lg font-medium hover:text-[var(--main-color)] transition-colors"
      >
        <ChevronUp
          size={20}
          className={clsx(
            'text-[var(--border-color)] transition-transform duration-300',
            !isExpanded && 'rotate-180'
          )}
        />
        <span>{title}</span>
      </button>
      {onSelectAll && (
        <button
          type="button"
          onClick={handleSelectAll}
          className="flex items-center gap-1 text-sm text-[var(--secondary-color)] hover:text-[var(--main-color)] transition-colors"
        >
          <MousePointer size={14} />
          <span>Select All</span>
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
