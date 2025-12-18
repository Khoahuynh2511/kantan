'use client';

import { X, Volume2 } from 'lucide-react';
import clsx from 'clsx';
import type { JishoWord } from '../types/dictionary';

interface WordDetailProps {
  word: JishoWord;
  onClose: () => void;
}

const WordDetail = ({ word, onClose }: WordDetailProps) => {
  const primary = word.japanese[0];
  const kanji = primary?.word;
  const reading = primary?.reading;
  const jlptLevel = word.jlpt[0]?.replace('jlpt-', '').toUpperCase();

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(reading || kanji || '');
      utterance.lang = 'ja-JP';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={clsx(
          'relative w-full max-w-lg mx-4 p-6 rounded-2xl',
          'bg-[var(--card-color)] border-2 border-[var(--border-color)]',
          'max-h-[80vh] overflow-y-auto shadow-2xl'
        )}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={clsx(
            'absolute top-4 right-4',
            'text-[var(--secondary-color)] hover:text-[var(--text-color)]',
            'transition-colors duration-200'
          )}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            {kanji && (
              <span className="text-4xl font-bold text-[var(--text-color)]">
                {kanji}
              </span>
            )}
            <button
              onClick={handleSpeak}
              className={clsx(
                'p-2 rounded-full',
                'bg-[var(--card-color)] hover:bg-[var(--border-color)]',
                'text-[var(--main-color)]',
                'transition-colors duration-200'
              )}
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xl text-[var(--secondary-color)]">{reading}</p>
          <div className="flex gap-2 mt-2">
            {jlptLevel && (
              <span className="px-2 py-0.5 text-xs font-medium rounded bg-[var(--main-color)] text-white">
                {jlptLevel}
              </span>
            )}
            {word.is_common && (
              <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-500 text-white">
                Common
              </span>
            )}
          </div>
        </div>

        {word.japanese.length > 1 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[var(--secondary-color)] mb-2">
              Other forms
            </h3>
            <div className="flex flex-wrap gap-2">
              {word.japanese.slice(1).map((jp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[var(--card-color)] text-[var(--text-color)]"
                >
                  {jp.word && <span className="font-medium">{jp.word}</span>}
                  {jp.word && jp.reading && <span className="mx-1">-</span>}
                  <span className="text-[var(--secondary-color)]">{jp.reading}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-[var(--secondary-color)] mb-3">
            Definitions
          </h3>
          <div className="space-y-4">
            {word.senses.map((sense, idx) => (
              <div key={idx} className="pb-3 border-b border-[var(--border-color)] last:border-0">
                {sense.parts_of_speech.length > 0 && (
                  <p className="text-xs text-[var(--main-color)] mb-1">
                    {sense.parts_of_speech.join(', ')}
                  </p>
                )}
                <p className="text-[var(--text-color)]">
                  <span className="text-[var(--secondary-color)] mr-2">{idx + 1}.</span>
                  {sense.english_definitions.join('; ')}
                </p>
                {sense.info.length > 0 && (
                  <p className="text-sm text-[var(--secondary-color)] mt-1 italic">
                    {sense.info.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordDetail;
