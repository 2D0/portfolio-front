'use client';
import { createContext, useContext, useState } from 'react';

interface ModaleContextType {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModaleContextType | null>(null);

export const ModalProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isModal, setIsModal] = useState<ModaleContextType['isModal']>(false);

  return (
    <ModalContext.Provider value={{ isModal, setIsModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const constext = useContext(ModalContext);

  if (!constext)
    throw new Error('useModal must be used within a ModalProvider');

  return constext;
};
