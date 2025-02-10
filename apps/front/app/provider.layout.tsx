'use client';
import { gowunDodum } from '@/public/fonts';
import { Provider } from 'react-redux';
import { store } from '@repo/commons/store/store.ts';
import { Navigation } from '@components/navigation';
import { ModalChatbot } from '@components/modal-chatbot';
import { Footer } from '@components/footer';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Provider store={store}>
      <body className={gowunDodum.className}>
        <Navigation />
        {children}
        <ModalChatbot />
        <Footer />
      </body>
    </Provider>
  );
}
