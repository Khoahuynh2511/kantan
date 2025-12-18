'use client';
import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useRouter } from '@/core/i18n/routing';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import {
  ChevronRight,
  Palette,
  Type,
  Settings2,
  X,
  Dice5
} from 'lucide-react';
import { useClick } from '@/shared/hooks/useAudio';
import usePreferencesStore from '@/features/Preferences/store/usePreferencesStore';
import useOnboardingStore from '@/shared/store/useOnboardingStore';
import { buttonBorderStyles, cardBorderStyles } from '@/shared/lib/styles';
import themeSets from '@/features/Preferences/data/themes';
import fonts from '@/features/Preferences/data/fonts';
import SakuraEffect from './SakuraEffect';

const Decorations = lazy(() => import('./Decorations'));

const japaneseGreetings = [
  { text: 'Welcome', reading: '' },
  { text: 'Youkoso', reading: 'youkoso' },
  { text: 'Irasshaimase', reading: 'irasshaimase' },
  { text: 'Hajimemashite', reading: 'hajimemashite' }
];

const LandingPage = () => {
  const router = useRouter();
  const { playClick } = useClick();
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'theme' | 'font'>('theme');
  const [greeting, setGreeting] = useState(japaneseGreetings[0]);
  const [isEntering, setIsEntering] = useState(false);
  const [fact, setFact] = useState<string>('');

  const setHasSeenWelcome = useOnboardingStore((state) => state.setHasSeenWelcome);

  const selectedTheme = usePreferencesStore((state) => state.theme);
  const setSelectedTheme = usePreferencesStore((state) => state.setTheme);
  const currentFont = usePreferencesStore((state) => state.font);
  const setFont = usePreferencesStore((state) => state.setFont);

  useEffect(() => {
    setMounted(true);
    const randomGreeting = japaneseGreetings[Math.floor(Math.random() * japaneseGreetings.length)];
    setGreeting(randomGreeting);

    const fetchFact = async () => {
      try {
        const response = await fetch('/japan-facts.json');
        const facts: string[] = await response.json();
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        setFact(randomFact);
      } catch (error) {
        console.error('Failed to load facts:', error);
      }
    };
    fetchFact();
  }, []);

  const handleEnter = useCallback((href: string) => {
    playClick();
    setIsEntering(true);
    setHasSeenWelcome(true);
    setTimeout(() => {
      router.push(href);
    }, 500);
  }, [playClick, router, setHasSeenWelcome]);

  const handleRandomTheme = () => {
    playClick();
    const darkThemes = themeSets.find((set) => set.name === 'Dark')?.themes || [];
    if (darkThemes.length > 0) {
      const randomTheme = darkThemes[Math.floor(Math.random() * darkThemes.length)];
      setSelectedTheme(randomTheme.id);
    }
  };

  const handleRandomFont = () => {
    playClick();
    if (fonts.length > 0) {
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
      if (randomFont?.name) {
        setFont(randomFont.name);
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <Suspense fallback={null}>
        <Decorations expandDecorations={false} interactive />
      </Suspense>

      <SakuraEffect count={25} />

      <AnimatePresence>
        {!isEntering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative z-20 flex flex-col items-center justify-center min-h-[100dvh] px-4"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={clsx(
                'fixed top-4 right-4 p-3 z-50',
                buttonBorderStyles,
                'hover:bg-[var(--border-color)]'
              )}
              onClick={() => {
                playClick();
                setShowSettings(true);
              }}
            >
              <Settings2 className="w-5 h-5" />
            </motion.button>

            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center"
              >
                <motion.p
                  className="text-lg md:text-xl text-[var(--secondary-color)] mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {greeting.text}
                </motion.p>
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-2 relative"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <motion.span 
                    className="inline-block text-[var(--main-color)] cursor-default"
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "backOut" }}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: "0 0 20px var(--main-color), 0 0 40px var(--main-color)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {'Kan'.split('').map((char, index) => (
                      <motion.span
                        key={index}
                        className="inline-block"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: 0.5 + index * 0.1, 
                          duration: 0.4,
                          ease: "backOut"
                        }}
                        whileHover={{
                          y: -5,
                          transition: { duration: 0.15 }
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                  <motion.span 
                    className="inline-block text-[var(--secondary-color)] cursor-default"
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: "backOut" }}
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: "0 0 20px var(--secondary-color), 0 0 40px var(--secondary-color)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {'Tan'.split('').map((char, index) => (
                      <motion.span
                        key={index}
                        className="inline-block"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: 0.8 + index * 0.1, 
                          duration: 0.4,
                          ease: "backOut"
                        }}
                        whileHover={{
                          y: -5,
                          transition: { duration: 0.15 }
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl text-[var(--secondary-color)] font-light"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5, ease: "backOut" }}
                >
                  簡単
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className={clsx(
                  'p-4 max-w-md text-center',
                  cardBorderStyles,
                  'bg-[var(--card-color)]/80 backdrop-blur-sm'
                )}
              >
                <p className="text-sm text-[var(--secondary-color)]">
                  Master Japanese Hiragana, Katakana, Kanji and Vocabulary
                </p>
                {fact && (
                  <p className="text-xs text-[var(--secondary-color)]/70 mt-2 italic border-t border-[var(--border-color)] pt-2">
                    {fact}
                  </p>
                )}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEnter('/kana')}
                className={clsx(
                  'group flex items-center gap-3 px-10 py-4',
                  buttonBorderStyles,
                  'bg-[var(--card-color)]/90 hover:bg-[var(--border-color)]',
                  'border-2 border-[var(--border-color)] hover:border-[var(--main-color)]/50',
                  'backdrop-blur-sm'
                )}
              >
                <span className="text-2xl font-bold">Enter</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap justify-center gap-3 mt-4"
              >
                <button
                  onClick={() => {
                    playClick();
                    setShowSettings(true);
                    setSettingsTab('theme');
                  }}
                  className="flex items-center gap-2 text-sm text-[var(--secondary-color)] hover:text-[var(--main-color)] transition-colors"
                >
                  <Palette className="w-4 h-4" />
                  <span>Theme</span>
                </button>
                <button
                  onClick={handleRandomTheme}
                  className="flex items-center gap-2 text-sm text-[var(--secondary-color)] hover:text-[var(--main-color)] transition-colors"
                  title="Random Theme"
                >
                  <Dice5 className="w-4 h-4" />
                </button>
                <span className="text-[var(--border-color)]">|</span>
                <button
                  onClick={() => {
                    playClick();
                    setShowSettings(true);
                    setSettingsTab('font');
                  }}
                  className="flex items-center gap-2 text-sm text-[var(--secondary-color)] hover:text-[var(--main-color)] transition-colors"
                >
                  <Type className="w-4 h-4" />
                  <span>Font</span>
                </button>
                <button
                  onClick={handleRandomFont}
                  className="flex items-center gap-2 text-sm text-[var(--secondary-color)] hover:text-[var(--main-color)] transition-colors"
                  title="Random Font"
                >
                  <Dice5 className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={clsx(
                'w-full max-w-lg max-h-[80vh] overflow-hidden',
                cardBorderStyles,
                'bg-[var(--card-color)]'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      playClick();
                      setSettingsTab('theme');
                    }}
                    className={clsx(
                      'px-4 py-2 rounded-lg transition-colors',
                      settingsTab === 'theme'
                        ? 'bg-[var(--border-color)] text-[var(--main-color)]'
                        : 'text-[var(--secondary-color)] hover:text-[var(--main-color)]'
                    )}
                  >
                    <Palette className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      playClick();
                      setSettingsTab('font');
                    }}
                    className={clsx(
                      'px-4 py-2 rounded-lg transition-colors',
                      settingsTab === 'font'
                        ? 'bg-[var(--border-color)] text-[var(--main-color)]'
                        : 'text-[var(--secondary-color)] hover:text-[var(--main-color)]'
                    )}
                  >
                    <Type className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    playClick();
                    setShowSettings(false);
                  }}
                  className="p-2 hover:bg-[var(--border-color)] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto max-h-[60vh]">
                {settingsTab === 'theme' && (
                  <div className="space-y-4">
                    <button
                      onClick={handleRandomTheme}
                      className={clsx(
                        'w-full p-3 flex items-center justify-center gap-2',
                        buttonBorderStyles,
                        'hover:bg-[var(--border-color)]'
                      )}
                    >
                      <Dice5 className="w-5 h-5" />
                      <span>Random Theme</span>
                    </button>
                    {themeSets.map((themeSet) => (
                      <div key={themeSet.name} className="space-y-2">
                        <h3 className="text-sm font-medium text-[var(--secondary-color)] flex items-center gap-2">
                          <themeSet.icon className="w-4 h-4" />
                          {themeSet.name}
                        </h3>
                        <div className="grid grid-cols-5 gap-2">
                          {themeSet.themes.map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => {
                                playClick();
                                setSelectedTheme(theme.id);
                              }}
                              className={clsx(
                                'h-10 rounded-lg border-2 transition-all',
                                selectedTheme === theme.id
                                  ? 'border-[var(--main-color)] scale-105'
                                  : 'border-transparent hover:border-[var(--border-color)]'
                              )}
                              style={{ backgroundColor: theme.backgroundColor }}
                              title={theme.id}
                            >
                              <div
                                className="w-full h-full rounded flex items-center justify-center text-xs"
                                style={{ color: theme.mainColor }}
                              >
                                {selectedTheme === theme.id && 'A'}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {settingsTab === 'font' && (
                  <div className="space-y-4">
                    <button
                      onClick={handleRandomFont}
                      className={clsx(
                        'w-full p-3 flex items-center justify-center gap-2',
                        buttonBorderStyles,
                        'hover:bg-[var(--border-color)]'
                      )}
                    >
                      <Dice5 className="w-5 h-5" />
                      <span>Random Font</span>
                    </button>
                    <div className="space-y-2">
                      {fonts.map((fontObj) => (
                        <button
                          key={fontObj.name}
                          onClick={() => {
                            playClick();
                            setFont(fontObj.name);
                          }}
                          className={clsx(
                            'w-full p-3 rounded-lg border-2 transition-all text-left',
                            currentFont === fontObj.name
                              ? 'border-[var(--main-color)] bg-[var(--border-color)]'
                              : 'border-[var(--border-color)] hover:border-[var(--main-color)]/50'
                          )}
                        >
                          <div className={fontObj.font.className}>
                            <span className="text-sm text-[var(--secondary-color)]">
                              {fontObj.name}
                            </span>
                            <div className="text-lg">kan tan</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
