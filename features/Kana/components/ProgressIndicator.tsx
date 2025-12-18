'use client';
import clsx from 'clsx';
import useKanaStore from '@/features/Kana/store/useKanaStore';
import { kana } from '@/features/Kana/data/kana';
import { useMemo } from 'react';

const ProgressIndicator = () => {
  const kanaGroupIndices = useKanaStore((state) => state.kanaGroupIndices);

  const totalKanaCount = useMemo(() => {
    return kana.reduce((acc, group) => acc + group.kana.length, 0);
  }, []);

  const selectedKanaCount = useMemo(() => {
    return kanaGroupIndices.reduce((acc, idx) => {
      const group = kana[idx];
      return acc + (group ? group.kana.length : 0);
    }, 0);
  }, [kanaGroupIndices]);

  const percentage = Math.round((selectedKanaCount / totalKanaCount) * 100);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center text-sm">
        <span className="text-[var(--secondary-color)]">Selected</span>
        <span className="font-medium">
          {selectedKanaCount}/{totalKanaCount} ({percentage}%)
        </span>
      </div>
      <div className="h-2 w-full bg-[var(--border-color)]/30 rounded-full overflow-hidden">
        <div
          className={clsx(
            'h-full bg-[var(--main-color)] rounded-full',
            'transition-all duration-300 ease-out'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
