'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import useDictionaryStore from '../store/useDictionaryStore';
import WordCard from './WordCard';
import type { JishoWord } from '../types/dictionary';

const POS_MAP: Record<string, string[]> = {
  noun: ['Noun'],
  verb: ['Verb', 'Ichidan verb', 'Godan verb'],
  adjective: ['I-adjective', 'Na-adjective', 'Adjective'],
  adverb: ['Adverb']
};

const SearchResults = () => {
  const results = useDictionaryStore(state => state.results);
  const isLoading = useDictionaryStore(state => state.isLoading);
  const error = useDictionaryStore(state => state.error);
  const filters = useDictionaryStore(state => state.filters);
  const loadMore = useDictionaryStore(state => state.loadMore);
  const hasMore = useDictionaryStore(state => state.hasMore);
  const setSelectedWord = useDictionaryStore(state => state.setSelectedWord);
  const searchQuery = useDictionaryStore(state => state.searchQuery);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filteredResults = useMemo(() => {
    return results.filter((word: JishoWord) => {
      if (filters.commonOnly && !word.is_common) return false;

      if (filters.jlptLevel !== 'all') {
        if (!word.jlpt.includes(filters.jlptLevel)) return false;
      }

      if (filters.partOfSpeech !== 'all') {
        const posPatterns = POS_MAP[filters.partOfSpeech] || [];
        const hasMatchingPos = word.senses.some(sense =>
          sense.parts_of_speech.some(pos =>
            posPatterns.some(pattern =>
              pos.toLowerCase().includes(pattern.toLowerCase())
            )
          )
        );
        if (!hasMatchingPos) return false;
      }

      return true;
    });
  }, [results, filters]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    },
    [hasMore, isLoading, loadMore]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (!searchQuery && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-6xl mb-4">辞</span>
        <p className="text-[var(--secondary-color)]">
          Enter a word to search
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-red-500 mb-2">{error}</p>
        <p className="text-[var(--secondary-color)]">Please try again</p>
      </div>
    );
  }

  if (!isLoading && results.length === 0 && searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-[var(--secondary-color)]">
          No results found for &quot;{searchQuery}&quot;
        </p>
      </div>
    );
  }

  if (filteredResults.length === 0 && results.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-[var(--secondary-color)]">
          No results match your filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredResults.map((word: JishoWord, idx: number) => (
        <WordCard
          key={`${word.slug}-${idx}`}
          word={word}
          onClick={() => setSelectedWord(word)}
        />
      ))}

      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {isLoading && (
          <div
            className={clsx(
              'w-6 h-6 border-2 rounded-full animate-spin',
              'border-[var(--border-color)] border-t-[var(--main-color)]'
            )}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
