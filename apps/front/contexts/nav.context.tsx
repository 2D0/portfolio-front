'use client';
import { createContext, useContext, useState } from 'react';
import type { NavNames } from '@/interface';

interface NavEventContextType {
  selectName: NavNames | null;
  setSelectName: React.Dispatch<React.SetStateAction<NavNames | null>>;
  navScroll: NavNames | null;
  setNavScroll: React.Dispatch<React.SetStateAction<NavNames | null>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavEventContext = createContext<NavEventContextType | null>(null);

export const NavChangeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [selectName, setSelectName] = useState<
    NavEventContextType['selectName'] | null
  >(null);
  const [navScroll, setNavScroll] = useState<
    NavEventContextType['selectName'] | null
  >(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavEventContext.Provider
      value={{
        selectName,
        setSelectName,
        navScroll,
        setNavScroll,
        isMenuOpen,
        setIsMenuOpen,
      }}
    >
      {children}
    </NavEventContext.Provider>
  );
};

export const useNavEvent = () => {
  const constext = useContext(NavEventContext);

  if (!constext)
    throw new Error('useNavEvent must be used within a NavChangeProvider');

  return constext;
};
