'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { removeLocaleFromPath } from '@/shared/lib/pathUtils';

const Banner = () => {
  const pathname = usePathname();
  const pathWithoutLocale = removeLocaleFromPath(pathname);

  const subheading =
    pathWithoutLocale === '/kana'
      ? 'Kana あ'
      : pathWithoutLocale === '/kanji'
      ? 'Kanji 字'
      : pathWithoutLocale === '/vocabulary'
      ? 'Vocabulary 語'
      : pathWithoutLocale === '/preferences'
      ? 'Preferences 設'
      : '';

  const parts = subheading ? subheading.split(' ') : [];
  const label = parts[0] ?? '';
  const glyph = parts[1] ?? '';

  return (
    <h2
      className={clsx(
        'pt-3 text-3xl lg:pt-6',
        'flex items-center gap-2 overflow-hidden'
      )}
    >
      {glyph ? (
        <span className="text-[var(--secondary-color)]">{glyph}</span>
      ) : null}
      <span>{label}</span>
    </h2>
  );
};

export default Banner;
