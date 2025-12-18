'use client';
import clsx from 'clsx';
import useKanaStore from '@/features/Kana/store/useKanaStore';
import { kana } from '@/features/Kana/data/kana';
import { useClick } from '@/shared/hooks/useAudio';

interface Preset {
  label: string;
  getIndices: () => number[];
}

const HIRAGANA_BASE_RANGE = [0, 10] as const;
const HIRAGANA_DAKUON_RANGE = [10, 15] as const;
const HIRAGANA_YOON_RANGE = [15, 26] as const;

const KATAKANA_BASE_RANGE = [26, 36] as const;
const KATAKANA_DAKUON_RANGE = [36, 41] as const;
const KATAKANA_YOON_RANGE = [41, 52] as const;

const presets: Preset[] = [
  {
    label: 'All Hiragana',
    getIndices: () => {
      const indices: number[] = [];
      for (let i = 0; i < 26; i++) {
        indices.push(i);
      }
      return indices;
    }
  },
  {
    label: 'All Katakana',
    getIndices: () => {
      const indices: number[] = [];
      for (let i = 26; i < 60; i++) {
        indices.push(i);
      }
      return indices;
    }
  },
  {
    label: 'Basic Only',
    getIndices: () => {
      const indices: number[] = [];
      for (let i = HIRAGANA_BASE_RANGE[0]; i < HIRAGANA_BASE_RANGE[1]; i++) {
        indices.push(i);
      }
      for (let i = KATAKANA_BASE_RANGE[0]; i < KATAKANA_BASE_RANGE[1]; i++) {
        indices.push(i);
      }
      return indices;
    }
  },
  {
    label: 'Dakuon + Handakuon',
    getIndices: () => {
      const indices: number[] = [];
      for (let i = HIRAGANA_DAKUON_RANGE[0]; i < HIRAGANA_DAKUON_RANGE[1]; i++) {
        indices.push(i);
      }
      for (let i = KATAKANA_DAKUON_RANGE[0]; i < KATAKANA_DAKUON_RANGE[1]; i++) {
        indices.push(i);
      }
      return indices;
    }
  },
  {
    label: 'Yoon (Combo)',
    getIndices: () => {
      const indices: number[] = [];
      for (let i = HIRAGANA_YOON_RANGE[0]; i < HIRAGANA_YOON_RANGE[1]; i++) {
        indices.push(i);
      }
      for (let i = KATAKANA_YOON_RANGE[0]; i < KATAKANA_YOON_RANGE[1]; i++) {
        indices.push(i);
      }
      return indices;
    }
  },
  {
    label: 'All Kana',
    getIndices: () => {
      return kana
        .map((_, i) => i)
        .filter((i) => !kana[i].groupName.startsWith('challenge.'));
    }
  }
];

const QuickSelectBar = () => {
  const { playClick } = useClick();
  const addKanaGroupIndices = useKanaStore((state) => state.addKanaGroupIndices);

  const handlePresetClick = (preset: Preset) => {
    playClick();
    addKanaGroupIndices(preset.getIndices());
  };

  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => handlePresetClick(preset)}
          className={clsx(
            'px-3 py-1.5 rounded-lg text-sm',
            'bg-[var(--card-color)]/80 backdrop-blur-sm',
            'border border-[var(--border-color)]',
            'hover:border-[var(--main-color)] hover:bg-[var(--main-color)]/10',
            'active:scale-95',
            'transition-all duration-200'
          )}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
};

export default QuickSelectBar;
