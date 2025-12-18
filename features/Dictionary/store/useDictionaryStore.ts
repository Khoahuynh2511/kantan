import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  JishoWord,
  DictionaryFilters,
  SearchHistoryItem,
  JlptLevel,
  PartOfSpeech
} from '../types/dictionary';
import { searchDictionary } from '../services/jishoService';

interface DictionaryState {
  searchQuery: string;
  results: JishoWord[];
  isLoading: boolean;
  error: string | null;
  filters: DictionaryFilters;
  searchHistory: SearchHistoryItem[];
  selectedWord: JishoWord | null;
  currentPage: number;
  hasMore: boolean;

  setSearchQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
  loadMore: () => Promise<void>;
  setJlptFilter: (level: JlptLevel) => void;
  setPartOfSpeechFilter: (pos: PartOfSpeech) => void;
  setCommonOnly: (value: boolean) => void;
  setSelectedWord: (word: JishoWord | null) => void;
  clearResults: () => void;
  clearHistory: () => void;
}

const HISTORY_LIMIT = 20;

const useDictionaryStore = create<DictionaryState>()(
  persist(
    (set, get) => ({
      searchQuery: '',
      results: [],
      isLoading: false,
      error: null,
      filters: {
        jlptLevel: 'all',
        partOfSpeech: 'all',
        commonOnly: false
      },
      searchHistory: [],
      selectedWord: null,
      currentPage: 1,
      hasMore: true,

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      search: async (query: string) => {
        if (!query.trim()) {
          set({ results: [], error: null });
          return;
        }

        set({ isLoading: true, error: null, currentPage: 1, hasMore: true });

        try {
          const response = await searchDictionary(query, 1);
          const results = response.data || [];

          set(state => {
            const history = state.searchHistory.filter(h => h.query !== query);
            history.unshift({ query, timestamp: Date.now() });
            if (history.length > HISTORY_LIMIT) {
              history.pop();
            }

            return {
              results,
              searchHistory: history,
              isLoading: false,
              hasMore: results.length >= 20
            };
          });
        } catch {
          set({ error: 'Failed to search', isLoading: false, results: [] });
        }
      },

      loadMore: async () => {
        const { searchQuery, currentPage, isLoading, hasMore } = get();
        if (isLoading || !hasMore || !searchQuery) return;

        set({ isLoading: true });

        try {
          const nextPage = currentPage + 1;
          const response = await searchDictionary(searchQuery, nextPage);
          const newResults = response.data || [];

          set(state => ({
            results: [...state.results, ...newResults],
            currentPage: nextPage,
            isLoading: false,
            hasMore: newResults.length >= 20
          }));
        } catch {
          set({ isLoading: false });
        }
      },

      setJlptFilter: (level: JlptLevel) => {
        set(state => ({
          filters: { ...state.filters, jlptLevel: level }
        }));
      },

      setPartOfSpeechFilter: (pos: PartOfSpeech) => {
        set(state => ({
          filters: { ...state.filters, partOfSpeech: pos }
        }));
      },

      setCommonOnly: (value: boolean) => {
        set(state => ({
          filters: { ...state.filters, commonOnly: value }
        }));
      },

      setSelectedWord: (word: JishoWord | null) => {
        set({ selectedWord: word });
      },

      clearResults: () => {
        set({ results: [], searchQuery: '', error: null, currentPage: 1, hasMore: true });
      },

      clearHistory: () => {
        set({ searchHistory: [] });
      }
    }),
    {
      name: 'dictionary-storage',
      partialize: state => ({
        searchHistory: state.searchHistory,
        filters: state.filters
      })
    }
  )
);

export default useDictionaryStore;
