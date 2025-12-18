export interface JishoJapanese {
  word?: string;
  reading: string;
}

export interface JishoSense {
  english_definitions: string[];
  parts_of_speech: string[];
  tags: string[];
  restrictions: string[];
  see_also: string[];
  info: string[];
}

export interface JishoWord {
  slug: string;
  is_common: boolean;
  tags: string[];
  jlpt: string[];
  japanese: JishoJapanese[];
  senses: JishoSense[];
}

export interface JishoApiResponse {
  meta: {
    status: number;
  };
  data: JishoWord[];
}

export type JlptLevel = 'all' | 'jlpt-n5' | 'jlpt-n4' | 'jlpt-n3' | 'jlpt-n2' | 'jlpt-n1';

export type PartOfSpeech = 'all' | 'noun' | 'verb' | 'adjective' | 'adverb';

export interface DictionaryFilters {
  jlptLevel: JlptLevel;
  partOfSpeech: PartOfSpeech;
  commonOnly: boolean;
}

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}
