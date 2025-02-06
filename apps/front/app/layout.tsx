import './globals.css';
import '@repo/ui/styles.css';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import ProviderLayout from './provider.layout';

const metadataMap = {
  title: '이다영 | 프론트엔드 개발자 포트폴리오',
  description: '프론트엔드 개발자 이다영의 포트폴리오입니다.',
  image: '/images/source/banner.png',
};

export const metadata: Metadata = {
  title: metadataMap.title,
  description: metadataMap.description,
  keywords:
    '메이크트리, 이다영, 프론트엔드, 프론트 엔드, 포트폴리오, 프론트엔드포트폴리오, 프론트엔드 포트폴리오, 프론트앤드, 프론트 앤드, 프론트앤드포트폴리오, 프론트앤드 포트폴리오, MakeTree, Make tree, MakeTree, DaYoung Lee, Frontend, Front End, Portfolio, Frontend Portfolio, Front End Portfolio, Front-And, Front And, Front-And Portfolio, Front And Portfolio, メイクツリー, メイクツリー, イ・ダヨン, フロントエンド, フロント エンド, ポートフォリオ, フロントエンドポートフォリオ, フロント エンド ポートフォリオ, フロントアンド, フロント アンド, フロントアンドポートフォリオ, フロント アンド ポートフォリオ',
  openGraph: {
    title: metadataMap.title,
    description: metadataMap.description,
    images: metadataMap.image,
  },
  twitter: {
    card: 'summary_large_image',
    title: metadataMap.title,
    description: metadataMap.description,
    images: metadataMap.image,
  },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
