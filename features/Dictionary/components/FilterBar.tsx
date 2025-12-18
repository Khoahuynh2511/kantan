'use client';

import clsx from 'clsx';
import useDictionaryStore from '../store/useDictionaryStore';
import type { JlptLevel, PartOfSpeech } from '../types/dictionary';

const JLPT_OPTIONS: { value: JlptLevel; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'jlpt-n5', label: 'N5' },
  { value: 'jlpt-n4', label: 'N4' },
  { value: 'jlpt-n3', label: 'N3' },
  { value: 'jlpt-n2', label: 'N2' },
  { value: 'jlpt-n1', label: 'N1' }
];

const POS_OPTIONS: { value: PartOfSpeech; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'adjective', label: 'Adj' },
  { value: 'adverb', label: 'Adv' }
];

const FilterBar = () => {
  const filters = useDictionaryStore(state => state.filters);
  const setJlptFilter = useDictionaryStore(state => state.setJlptFilter);
  const setPartOfSpeechFilter = useDictionaryStore(state => state.setPartOfSpeechFilter);
  const setCommonOnly = useDictionaryStore(state => state.setCommonOnly);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--secondary-color)]">JLPT:</span>
        <div className="flex gap-1">
          {JLPT_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => setJlptFilter(option.value)}
              className={clsx(
                'px-2 py-1 text-sm rounded-md transition-colors duration-200',
                filters.jlptLevel === option.value
                  ? 'bg-[var(--main-color)] text-white'
                  : 'bg-[var(--card-color)] text-[var(--text-color)] hover:bg-[var(--border-color)]'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--secondary-color)]">Type:</span>
        <div className="flex gap-1">
          {POS_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => setPartOfSpeechFilter(option.value)}
              className={clsx(
                'px-2 py-1 text-sm rounded-md transition-colors duration-200',
                filters.partOfSpeech === option.value
                  ? 'bg-[var(--main-color)] text-white'
                  : 'bg-[var(--card-color)] text-[var(--text-color)] hover:bg-[var(--border-color)]'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={filters.commonOnly}
          onChange={e => setCommonOnly(e.target.checked)}
          className="w-4 h-4 accent-[var(--main-color)]"
        />
        <span className="text-sm text-[var(--text-color)]">Common only</span>
      </label>
    </div>
  );
};

export default FilterBar;
