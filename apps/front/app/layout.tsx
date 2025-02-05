import './globals.css';
import '@repo/ui/styles.css';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import ProviderLayout from './provider.layout';

export const metadata: Metadata = {
  title: '이다영 | 프론트엔드 개발자 포트폴리오',
  description: '프론트엔드 개발자 이다영의 포트폴리오입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <ProviderLayout>
        {children}
        <Analytics />
      </ProviderLayout>
    </html>
  );
}
