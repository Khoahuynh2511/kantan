'use client';
import { useState, useMemo } from 'react';
import clsx from 'clsx';
import KanaCell from './KanaCell';
import SectionHeader from './SectionHeader';
import KanaPreview from './KanaPreview';
import { kana } from '@/features/Kana/data/kana';
import useKanaStore from '@/features/Kana/store/useKanaStore';

type KanaType = 'hiragana' | 'katakana' | 'challenge';

interface KanaGridProps {
  type: KanaType;
  searchQuery?: string;
}

interface KanaSection {
  name: string;
  sliceRange: [number, number];
}

const SECTIONS: Record<KanaType, KanaSection[]> = {
  hiragana: [
    { name: 'Base', sliceRange: [0, 10] },
    { name: 'Dakuon', sliceRange: [10, 15] },
    { name: 'Yoon', sliceRange: [15, 26] }
  ],
  katakana: [
    { name: 'Base', sliceRange: [26, 36] },
    { name: 'Dakuon', sliceRange: [36, 41] },
    { name: 'Yoon', sliceRange: [41, 52] },
    { name: 'Foreign Sounds', sliceRange: [52, 60] }
  ],
  challenge: [
    { name: 'Similar Hiragana', sliceRange: [60, 65] },
    { name: 'Confusing Katakana', sliceRange: [65, 69] }
  ]
};

const KanaGrid = ({ type, searchQuery = '' }: KanaGridProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(SECTIONS[type].map((s) => s.name))
  );
  const [previewKana, setPreviewKana] = useState<{
    kana: string;
    romanji: string;
  } | null>(null);

  const kanaGroupIndices = useKanaStore((state) => state.kanaGroupIndices);
  const addKanaGroupIndex = useKanaStore((state) => state.addKanaGroupIndex);
  const addKanaGroupIndices = useKanaStore((state) => state.addKanaGroupIndices);

  const sections = SECTIONS[type];

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionName)) {
        next.delete(sectionName);
      } else {
        next.add(sectionName);
      }
      return next;
    });
  };

  const selectAllInSection = (sliceRange: [number, number]) => {
    const indices: number[] = [];
    for (let i = sliceRange[0]; i < sliceRange[1]; i++) {
      indices.push(i);
    }
    addKanaGroupIndices(indices);
  };

  const filteredKanaData = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    const results: Array<{
      kana: string;
      romanji: string;
      globalIndex: number;
      localIndex: number;
    }> = [];

    sections.forEach((section) => {
      const sectionKana = kana.slice(section.sliceRange[0], section.sliceRange[1]);
      sectionKana.forEach((group, groupIdx) => {
        group.kana.forEach((k, idx) => {
          const r = group.romanji[idx];
          if (k.includes(query) || r.toLowerCase().includes(query)) {
            results.push({
              kana: k,
              romanji: r,
              globalIndex: section.sliceRange[0] + groupIdx,
              localIndex: idx
            });
          }
        });
      });
    });

    return results;
  }, [searchQuery, sections]);

  if (filteredKanaData && filteredKanaData.length > 0) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-[var(--secondary-color)]">
          Found {filteredKanaData.length} results
        </p>
        <div className="flex flex-wrap gap-2">
          {filteredKanaData.map((item, idx) => (
            <KanaCell
              key={`${item.kana}-${idx}`}
              kana={item.kana}
              romanji={item.romanji}
              isSelected={kanaGroupIndices.includes(item.globalIndex)}
              onToggle={() => addKanaGroupIndex(item.globalIndex)}
              onPreview={() =>
                setPreviewKana({ kana: item.kana, romanji: item.romanji })
              }
            />
          ))}
        </div>
        {previewKana && (
          <KanaPreview
            kana={previewKana.kana}
            romanji={previewKana.romanji}
            isOpen={!!previewKana}
            onClose={() => setPreviewKana(null)}
          />
        )}
      </div>
    );
  }

  if (filteredKanaData && filteredKanaData.length === 0) {
    return (
      <p className="text-center text-[var(--secondary-color)] py-8">
        No kana found for "{searchQuery}"
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.name);
        const sectionKana = kana.slice(section.sliceRange[0], section.sliceRange[1]);

        return (
          <div key={section.name} className="flex flex-col">
            <SectionHeader
              title={section.name}
              isExpanded={isExpanded}
              onToggle={() => toggleSection(section.name)}
              onSelectAll={() => selectAllInSection(section.sliceRange)}
            />

            {isExpanded && (
              <div className="flex flex-col gap-3 pt-2">
                {sectionKana.map((group, groupIdx) => {
                  const globalIndex = section.sliceRange[0] + groupIdx;
                  const isGroupSelected = kanaGroupIndices.includes(globalIndex);

                  return (
                    <div key={group.groupName} className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        {group.kana.map((k, idx) => (
                          <KanaCell
                            key={`${k}-${idx}`}
                            kana={k}
                            romanji={group.romanji[idx]}
                            isSelected={isGroupSelected}
                            onToggle={() => addKanaGroupIndex(globalIndex)}
                            onPreview={() =>
                              setPreviewKana({
                                kana: k,
                                romanji: group.romanji[idx]
                              })
                            }
                          />
                        ))}
                      </div>
                      {groupIdx < sectionKana.length - 1 && (
                        <hr
                          className={clsx(
                            'border-t border-[var(--border-color)]/30',
                            'my-1'
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {previewKana && (
        <KanaPreview
          kana={previewKana.kana}
          romanji={previewKana.romanji}
          isOpen={!!previewKana}
          onClose={() => setPreviewKana(null)}
        />
      )}
    </div>
  );
};

export default KanaGrid;
