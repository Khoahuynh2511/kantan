'use client';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import { useRef } from 'react';

interface KanaSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const KanaSearch = ({
  value,
  onChange,
  placeholder = 'Search kana or romanji...'
}: KanaSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--secondary-color)]"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'w-full pl-10 pr-10 py-2.5 rounded-lg',
          'bg-[var(--card-color)]/80 backdrop-blur-sm',
          'border border-[var(--border-color)]',
          'focus:border-[var(--main-color)] focus:ring-2 focus:ring-[var(--main-color)]/20',
          'focus:outline-none',
          'placeholder:text-[var(--secondary-color)]',
          'transition-all duration-200'
        )}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--secondary-color)] hover:text-[var(--text-color)] transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default KanaSearch;
