'use client';
import { Link, useRouter, usePathname } from '@/core/i18n/routing';
import { House, Sparkles, TrendingUp, Trophy, ChevronLeft, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { useClick } from '@/shared/hooks/useAudio';
import { useEffect, useRef } from 'react';
import usePreferencesStore from '@/features/Preferences/store/usePreferencesStore';
import { removeLocaleFromPath } from '@/shared/lib/pathUtils';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
}

const NavItem = ({ href, icon, label, isActive, isExpanded, onClick, className }: NavItemProps) => (
  <Link
    href={href}
    className={clsx(
      'relative group flex items-center gap-3 rounded-lg transition-all duration-250',
      'py-2.5',
      isExpanded ? 'px-4' : 'px-3 justify-center',
      isActive
        ? 'text-[var(--main-color)] bg-[var(--card-color)]'
        : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)] hover:text-[var(--text-color)]',
      className
    )}
    onClick={onClick}
  >
    {isActive && (
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--main-color)] rounded-r-full before:content-[''] before:absolute before:-top-1 before:-left-0.5 before:w-1.5 before:h-2 before:bg-[var(--main-color)] before:rounded-full before:opacity-60" />
    )}
    <span className="text-xl shrink-0">{icon}</span>
    <span
      className={clsx(
        'text-lg whitespace-nowrap transition-all duration-250',
        isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
      )}
    >
      {label}
    </span>
    {!isExpanded && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-[var(--card-color)] border border-[var(--border-color)] rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-lg">
        {label}
      </div>
    )}
  </Link>
);

interface MobileNavItemProps {
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const MobileNavItem = ({ href, icon, isActive, onClick }: MobileNavItemProps) => (
  <Link
    href={href}
    className={clsx(
      'flex justify-center items-center p-3 rounded-xl text-2xl transition-all duration-250',
      isActive
        ? 'text-[var(--main-color)] bg-[var(--border-color)]'
        : 'text-[var(--secondary-color)] hover:bg-[var(--card-color)]'
    )}
    onClick={onClick}
  >
    {icon}
  </Link>
);

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathWithoutLocale = removeLocaleFromPath(pathname);

  const hotkeysOn = usePreferencesStore(state => state.hotkeysOn);
  const isExpanded = usePreferencesStore(state => state.sidebarExpanded);
  const toggleSidebar = usePreferencesStore(state => state.toggleSidebar);

  const { playClick } = useClick();

  const escButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!hotkeysOn) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        escButtonRef.current?.click();
      } else if (event.key.toLowerCase() === 'h') {
        router.push('/');
      } else if (event.key.toLowerCase() === 'p') {
        router.push('/preferences');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hotkeysOn, router]);

  const navItems = [
    { href: '/', icon: <House />, label: 'Home' },
    { href: '/dictionary', icon: <BookOpen />, label: 'Dictionary' },
    { href: '/kana', icon: 'あ', label: 'Kana' },
    { href: '/vocabulary', icon: '語', label: 'Vocabulary' },
    { href: '/kanji', icon: '字', label: 'Kanji' },
    { href: '/progress', icon: <TrendingUp />, label: 'Progress' },
    { href: '/achievements', icon: <Trophy />, label: 'Achievements' },
    { href: '/preferences', icon: <Sparkles className={clsx('shrink-0', pathWithoutLocale !== '/preferences' && 'motion-safe:animate-bounce')} />, label: 'Preferences' }
  ];

  const mobileNavItems = navItems.slice(0, 6);

  return (
    <>
      <aside
        id="main-sidebar"
        className={clsx(
          'flex flex-col h-screen sticky top-0 z-50',
          'bg-[var(--bg-color)] border-r border-[var(--border-color)]',
          'transition-all duration-300 ease-in-out',
          isExpanded ? 'w-56' : 'w-16',
          'max-lg:hidden',
          'pb-8'
        )}
      >
        <div className={clsx(
          'flex items-center py-5 border-b border-[var(--border-color)]',
          isExpanded ? 'px-4 gap-2' : 'px-2 justify-center'
        )}>
          {isExpanded && (
            <span className="text-2xl font-bold text-[var(--main-color)]">
              KanTan
            </span>
          )}
          <span className={clsx(
            'text-[var(--secondary-color)]',
            isExpanded ? 'text-lg' : 'text-xl font-bold text-[var(--main-color)]'
          )}>
            簡単
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-1 py-4 px-2">
          {navItems.map(item => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathWithoutLocale === item.href}
              isExpanded={isExpanded}
              onClick={playClick}
            />
          ))}
        </nav>

        <button
          onClick={() => {
            playClick();
            toggleSidebar();
          }}
          className={clsx(
            'flex items-center justify-center gap-2 py-3',
            isExpanded && 'border-t border-[var(--border-color)]',
            'text-[var(--secondary-color)] hover:text-[var(--text-color)] hover:bg-[var(--card-color)]',
            'transition-colors duration-200'
          )}
        >
          {isExpanded ? (
            <>
              <ChevronLeft size={18} />
              <span className="text-sm">閉</span>
            </>
          ) : (
            <span className="text-sm">開</span>
          )}
        </button>
      </aside>

      <nav
        id="mobile-nav"
        className={clsx(
          'lg:hidden fixed bottom-0 left-0 right-0 z-50',
          'bg-[var(--card-color)] border-t-2 border-[var(--border-color)]',
          'flex justify-evenly items-center py-2'
        )}
      >
        {mobileNavItems.map(item => (
          <MobileNavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            isActive={pathWithoutLocale === item.href}
            onClick={playClick}
          />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
