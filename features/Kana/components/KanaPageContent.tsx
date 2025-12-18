'use client';
import { useState } from 'react';
import clsx from 'clsx';
import KanaTabs, { TabId } from './KanaTabs';
import KanaGrid from './KanaGrid';
import KanaSearch from './KanaSearch';
import ProgressIndicator from './ProgressIndicator';
import QuickSelectBar from './QuickSelectBar';
import { cardBorderStyles } from '@/shared/lib/styles';

const KanaPageContent = () => {
  const [activeTab, setActiveTab] = useState<TabId>('hiragana');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className={clsx('flex flex-col gap-4 p-4', cardBorderStyles)}>
        <ProgressIndicator />
        <KanaSearch value={searchQuery} onChange={setSearchQuery} />
        <QuickSelectBar />
      </div>

      <div className={clsx('flex flex-col gap-4 p-4', cardBorderStyles)}>
        <KanaTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <KanaGrid type={activeTab} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default KanaPageContent;
