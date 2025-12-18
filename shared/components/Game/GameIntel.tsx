'use client';
import { MousePointer } from 'lucide-react';
import clsx from 'clsx';
import { cardBorderStyles } from '@/shared/lib/styles';
import useKanjiStore from '@/features/Kanji/store/useKanjiStore';
import useVocabStore from '@/features/Vocabulary/store/useVocabStore';
import { usePathname } from 'next/navigation';
import { removeLocaleFromPath } from '@/shared/lib/pathUtils';
import { formatLevelsAsRanges } from '@/shared/lib/helperFunctions';

const GameIntel = ({
  gameMode: _gameMode,
  feedback
}: {
  gameMode: string;
  feedback?: React.JSX.Element;
}) => {
  void _gameMode;
  const pathname = usePathname();
  const pathWithoutLocale = removeLocaleFromPath(pathname);
  const trainingDojo = pathWithoutLocale.split('/')[1];

  const selectedKanjiSets = useKanjiStore(state => state.selectedKanjiSets);
  const selectedVocabSets = useVocabStore(state => state.selectedVocabSets);

  const formattedSelectionFull =
    trainingDojo === 'kanji'
      ? formatLevelsAsRanges(selectedKanjiSets)
          .split(', ')
          .map(r => `${r.includes('-') ? 'Levels' : 'Level'} ${r}`)
          .join(', ')
      : trainingDojo === 'vocabulary'
        ? formatLevelsAsRanges(selectedVocabSets)
            .split(', ')
            .map(r => `${r.includes('-') ? 'Levels' : 'Level'} ${r}`)
            .join(', ')
        : null;

  // useEffect(() => {
  //   if (!isHidden) totalTimeStopwatch.start();
  // }, [isHidden]);

  return (
    <div
      className={clsx(
        'flex flex-col',

        cardBorderStyles,
        'text-[var(--secondary-color)]'
      )}
    >
      <div
        className={clsx(
          ' flex flex-col  items-center justify-center',
          'md:flex-row '
        )}
      ></div>

      {feedback && (
        <p className="text-xl flex justify-center items-center gap-1.5 px-4 py-3  w-full  border-[var(--border-color)]">
          {feedback}
        </p>
      )}

      <div
        className={clsx(
          'p-4 w-full border-[var(--border-color)] flex flex-col gap-2',
          trainingDojo === 'kana' && 'hidden'
        )}
      >
        <span className="flex gap-2 items-center">
          <MousePointer size={20} className="text-[var(--main-color)]" />
          Selected Levels:
        </span>
        <span className="text-[var(--main-color)] text-sm break-words">
          {formattedSelectionFull}
        </span>
      </div>
    </div>
  );
};

export default GameIntel;
