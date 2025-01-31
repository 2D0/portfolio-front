'use client';
import { createContext, useContext, useState } from 'react';
import type { IconNames } from '@repo/ui/interface';

interface IconChangeContextType {
  icon: IconNames;
  setIcon: React.Dispatch<React.SetStateAction<IconNames>>;
}

const IconChangeContext = createContext<IconChangeContextType | null>(null);

export const IconChangeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [icon, setIcon] = useState<IconChangeContextType['icon']>('React');

  return (
    <IconChangeContext.Provider value={{ icon, setIcon }}>
      {children}
    </IconChangeContext.Provider>
  );
};

export const useIconChange = () => {
  const constext = useContext(IconChangeContext);

  if (!constext)
    throw new Error('useIconChange must be used within a IconChangeProvider');

  return constext;
};
