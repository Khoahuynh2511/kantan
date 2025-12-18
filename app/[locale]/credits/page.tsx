import Credits from '@/features/Legal/credits/Credits';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Credits - Contributors & Supporters',
  description:
    'Recognizing the contributors, supporters, and community members who help make KanaDojo possible. See the people behind our Japanese learning platform.',
  alternates: {
    canonical: 'https://kanadojo.com/credits'
  }
};

export default function CreditsRoute() {
  return <Credits />;
}
