'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import clsx from 'clsx';
import useDictionaryStore from '../store/useDictionaryStore';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder = 'Search...' }: SearchBarProps) => {
  const searchQuery = useDictionaryStore(state => state.searchQuery);
  const setSearchQuery = useDictionaryStore(state => state.setSearchQuery);
  const search = useDictionaryStore(state => state.search);
  const isLoading = useDictionaryStore(state => state.isLoading);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      search(query);
    },
    [setSearchQuery, search]
  );

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (localQuery !== searchQuery) {
        handleSearch(localQuery);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [localQuery, searchQuery, handleSearch]);

  const handleClear = () => {
    setLocalQuery('');
    handleSearch('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    handleSearch(localQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <Search
          className={clsx(
            'absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5',
            isLoading ? 'text-[var(--main-color)] animate-pulse' : 'text-[var(--secondary-color)]'
          )}
        />
        <input
          type="text"
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            'w-full pl-12 pr-12 py-3 rounded-xl',
            'bg-[var(--card-color)] border-2 border-[var(--border-color)]',
            'text-[var(--text-color)] placeholder-[var(--secondary-color)]',
            'focus:outline-none focus:border-[var(--main-color)]',
            'transition-colors duration-200'
          )}
        />
        {localQuery && (
          <button
            type="button"
            onClick={handleClear}
            className={clsx(
              'absolute right-4 top-1/2 -translate-y-1/2',
              'text-[var(--secondary-color)] hover:text-[var(--text-color)]',
              'transition-colors duration-200'
            )}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
