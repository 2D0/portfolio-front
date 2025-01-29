'use client';
import { createContext, useContext, useState } from 'react';
import type { NavNames } from '@/interface';

interface NavEventContextType {
  selectName: NavNames;
  setSelectName: React.Dispatch<React.SetStateAction<NavNames>>;
  navScroll: NavNames | null;
  setNavScroll: React.Dispatch<React.SetStateAction<NavNames | null>>;
}

const NavEventContext = createContext<NavEventContextType | null>(null);

export const NavChangeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [selectName, setSelectName] =
    useState<NavEventContextType['selectName']>('HOME');
  const [navScroll, setNavScroll] = useState<
    NavEventContextType['selectName'] | null
  >(null);

  return (
    <NavEventContext.Provider
      value={{ selectName, setSelectName, navScroll, setNavScroll }}
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
