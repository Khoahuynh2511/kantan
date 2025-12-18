'use client';

import { useClick } from '@/shared/hooks/useAudio';
import { Link } from '@/core/i18n/routing';
import clsx from 'clsx';
import { buttonBorderStyles } from '@/shared/lib/styles';
import { useTranslations } from 'next-intl';

const BackButton = () => {
  const { playClick } = useClick();
  const t = useTranslations('common');

  return (
    <Link href="/" className="w-full md:w-1/3 lg:w-1/4">
      <button
        onClick={() => playClick()}
        className={clsx(
          buttonBorderStyles,
          'py-4 px-16 text-[var(--main-color)] border-b-4 border-[var(--border-color)] hover:border-[var(--main-color)]/80',
          'w-full',
          'flex items-center justify-center'
        )}
      >
        <span className="text-base font-medium">{t('buttons.back')}</span>
      </button>
    </Link>
  );
};

export default BackButton;
