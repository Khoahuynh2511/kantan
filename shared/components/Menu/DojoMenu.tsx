'use client';
import clsx from 'clsx';
import TrainingActionBar from '@/shared/components/Menu/TrainingActionBar';
import Sidebar from '@/shared/components/Menu/Sidebar';
import Info from '@/shared/components/Menu/Info';
import KanaPageContent from '@/features/Kana/components/KanaPageContent';
import Banner from '@/shared/components/Menu/Banner';
import CollectionSelector from '@/shared/components/Menu/CollectionSelector';
import KanjiCards from '@/features/Kanji/components';
import { usePathname } from 'next/navigation';
import VocabCards from '@/features/Vocabulary/components';
import { removeLocaleFromPath } from '@/shared/lib/pathUtils';
import SelectionStatusBar from '@/shared/components/Menu/SelectionStatusBar';

const DojoMenu = () => {
  const pathname = usePathname();
  const pathWithoutLocale = removeLocaleFromPath(pathname);

  return (
    <div className='min-h-[100dvh] max-w-[100dvw] flex'>
      <Sidebar />
      <div
        className={clsx(
          'flex flex-col gap-4',
          'flex-1 min-w-0 lg:px-8 px-4 md:px-8',
          'pb-20'
        )}
      >
        <Banner />

        {pathWithoutLocale === '/kana' ? (
          <div className='flex flex-col gap-3'>
            <Info />
            <KanaPageContent />
            <SelectionStatusBar />
          </div>
        ) : pathWithoutLocale === '/kanji' ? (
          <div className='flex flex-col gap-3'>
            <Info />
            <CollectionSelector />
            <KanjiCards />
          </div>
        ) : pathWithoutLocale === '/vocabulary' ? (
          <div className='flex flex-col gap-3'>
            <Info />
            <CollectionSelector />
            <VocabCards />
          </div>
        ) : null}
        <TrainingActionBar currentDojo={pathWithoutLocale.slice(1)} />
      </div>
    </div>
  );
};

export default DojoMenu;
