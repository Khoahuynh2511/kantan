'use client';

import BackButton from '../navigation/BackButton';
import Banner from '../Menu/Banner';

const ContentLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[100dvh] w-full">
    <div className="mx-auto w-full max-w-6xl px-4 pb-[calc(env(safe-area-inset-bottom)+2.5rem)] sm:px-8 lg:px-12">
      <Banner />
      <BackButton />
      <main id="main-content" tabIndex={-1} className="pt-4">
        {children}
      </main>
    </div>
  </div>
);

export default ContentLayout;
