'use client';

import clsx from 'clsx';
import type { JishoWord } from '../types/dictionary';

interface WordCardProps {
  word: JishoWord;
  onClick: () => void;
}

const WordCard = ({ word, onClick }: WordCardProps) => {
  const primary = word.japanese[0];
  const kanji = primary?.word;
  const reading = primary?.reading;
  const meanings = word.senses[0]?.english_definitions.slice(0, 2).join(', ') || '';
  const jlptLevel = word.jlpt[0]?.replace('jlpt-', '').toUpperCase();
  const isCommon = word.is_common;

  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full p-4 rounded-xl text-left',
        'bg-[var(--card-color)] border border-[var(--border-color)]',
        'hover:border-[var(--main-color)] hover:shadow-md',
        'transition-all duration-200'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            {kanji && (
              <span className="text-2xl font-bold text-[var(--text-color)]">
                {kanji}
              </span>
            )}
            <span className={clsx(
              'text-[var(--secondary-color)]',
              kanji ? 'text-base' : 'text-2xl font-bold text-[var(--text-color)]'
            )}>
              {reading}
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--secondary-color)] line-clamp-2">
            {meanings}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {jlptLevel && (
            <span className="px-2 py-0.5 text-xs font-medium rounded bg-[var(--main-color)] text-white">
              {jlptLevel}
            </span>
          )}
          {isCommon && (
            <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-500 text-white">
              Common
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default WordCard;
