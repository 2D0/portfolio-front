'use client';
import { gowunDodum } from '@/public/fonts';
import { ModalProvider } from '@/contexts/modal.context';
import { NavChangeProvider } from '@/contexts/nav.context';
import { Navigation } from '@components/navigation';
import { ModalChatbot } from '@/components/modal-chatbot';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <NavChangeProvider>
      <ModalProvider>
        <body className={gowunDodum.className}>
          <ModalChatbot />
          <Navigation />
          {children}
        </body>
      </ModalProvider>
    </NavChangeProvider>
  );
}
