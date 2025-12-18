'use client';

import { History, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import useDictionaryStore from '../store/useDictionaryStore';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import SearchResults from './SearchResults';
import WordDetail from './WordDetail';
import Sidebar from '@/shared/components/Menu/Sidebar';

const DictionaryPage = () => {
  const selectedWord = useDictionaryStore(state => state.selectedWord);
  const setSelectedWord = useDictionaryStore(state => state.setSelectedWord);
  const searchHistory = useDictionaryStore(state => state.searchHistory);
  const clearHistory = useDictionaryStore(state => state.clearHistory);
  const setSearchQuery = useDictionaryStore(state => state.setSearchQuery);
  const search = useDictionaryStore(state => state.search);

  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    search(query);
  };

  return (
    <div className="min-h-[100dvh] max-w-[100dvw] flex">
      <Sidebar />
      <div
        className={clsx(
          'flex flex-col',
          'flex-1 min-w-0 lg:px-8 px-4 md:px-8',
          'pb-20'
        )}
      >
        <div className="w-full max-w-3xl mx-auto py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">
              Dictionary
            </h1>
            <p className="text-[var(--secondary-color)]">
              Search Japanese words, kanji, and phrases
            </p>
          </div>

          <div className="mb-6">
            <SearchBar placeholder="Search Japanese, romaji, or English..." />
          </div>

          <div className="mb-6">
            <FilterBar />
          </div>

          {searchHistory.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[var(--secondary-color)]">
                  <History className="w-4 h-4" />
                  <span className="text-sm">Recent searches</span>
                </div>
                <button
                  onClick={clearHistory}
                  className={clsx(
                    'flex items-center gap-1 px-2 py-1 rounded text-xs',
                    'text-[var(--secondary-color)] hover:text-red-500',
                    'transition-colors duration-200'
                  )}
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.slice(0, 8).map(item => (
                  <button
                    key={item.timestamp}
                    onClick={() => handleHistoryClick(item.query)}
                    className={clsx(
                      'px-3 py-1 text-sm rounded-full',
                      'bg-[var(--card-color)] text-[var(--text-color)]',
                      'hover:bg-[var(--border-color)]',
                      'transition-colors duration-200'
                    )}
                  >
                    {item.query}
                  </button>
                ))}
              </div>
            </div>
          )}

          <SearchResults />

          {selectedWord && (
            <WordDetail word={selectedWord} onClose={() => setSelectedWord(null)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DictionaryPage;
