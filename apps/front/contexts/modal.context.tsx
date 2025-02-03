'use client';
import { createContext, useContext, useState } from 'react';
import type { SelectMapType } from '@/interface';

interface ModaleContextType {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  nameValue: string;
  setNameValue: React.Dispatch<React.SetStateAction<string>>;
  answear: string;
  setAnswear: React.Dispatch<React.SetStateAction<string>>;
  selectId: Record<keyof SelectMapType, SelectMapType[keyof SelectMapType]>;
  setSelectId: React.Dispatch<
    React.SetStateAction<
      Record<keyof SelectMapType, SelectMapType[keyof SelectMapType]>
    >
  >;
}

const ModalContext = createContext<ModaleContextType | null>(null);

export const ModalProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isModal, setIsModal] = useState<ModaleContextType['isModal']>(false);
  const [step, setStep] = useState(1);
  const [nameValue, setNameValue] = useState('');
  const [answear, setAnswear] = useState('');
  const [selectId, setSelectId] = useState<
    Record<keyof SelectMapType, SelectMapType[keyof SelectMapType]>
  >({
    visitor: '',
    thought: '',
    score: '',
  });

  return (
    <ModalContext.Provider
      value={{
        isModal,
        setIsModal,
        step,
        setStep,
        nameValue,
        setNameValue,
        answear,
        setAnswear,
        selectId,
        setSelectId,
      }}
    >
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
