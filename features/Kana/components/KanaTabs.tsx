'use client';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useClick } from '@/shared/hooks/useAudio';

type TabId = 'hiragana' | 'katakana' | 'challenge';

interface Tab {
  id: TabId;
  label: string;
  japanese: string;
}

const tabs: Tab[] = [
  { id: 'hiragana', label: 'Hiragana', japanese: 'ひらがな' },
  { id: 'katakana', label: 'Katakana', japanese: 'カタカナ' },
  { id: 'challenge', label: 'Challenge', japanese: 'チャレンジ' }
];

interface KanaTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const KanaTabs = ({ activeTab, onTabChange }: KanaTabsProps) => {
  const { playClick } = useClick();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key.toLowerCase()) {
        case 'h':
          onTabChange('hiragana');
          break;
        case 'k':
          onTabChange('katakana');
          break;
        case 'c':
          onTabChange('challenge');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onTabChange]);

  const handleTabClick = (tabId: TabId) => {
    playClick();
    onTabChange(tabId);
  };

  return (
    <div className="flex flex-row gap-1 p-1 bg-[var(--card-color)]/50 rounded-xl backdrop-blur-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className={clsx(
              'flex-1 flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-[var(--main-color)]/50',
              isActive
                ? 'bg-[var(--main-color)] text-white shadow-lg'
                : 'hover:bg-[var(--border-color)]/30 text-[var(--text-color)]'
            )}
          >
            <span className="text-sm font-medium">{tab.label}</span>
            <span
              className={clsx(
                'text-xs',
                isActive ? 'text-white/80' : 'text-[var(--secondary-color)]'
              )}
            >
              {tab.japanese}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default KanaTabs;
export type { TabId };
