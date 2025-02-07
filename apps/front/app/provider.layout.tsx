'use client';
import { gowunDodum } from '@/public/fonts';
import { RecoilRoot } from 'recoil';
import { Navigation } from '@components/navigation';
import { ModalChatbot } from '@components/modal-chatbot';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <RecoilRoot>
      <body className={gowunDodum.className}>
        <Navigation />
        {children}
        <ModalChatbot />
      </body>
    </RecoilRoot>
  );
}
