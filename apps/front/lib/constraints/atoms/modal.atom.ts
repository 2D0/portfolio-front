import { atom } from 'recoil';
import type { SelectMapType } from '@/interface';

export const chatStepState = atom<number>({
  key: 'chatStep',
  default: 1,
});
export const userNameState = atom<string>({
  key: 'userName',
  default: '',
});
export const chatAnswearState = atom<string>({
  key: 'chatAnswear',
  default: '',
});
export const selectMapState = atom<
  Record<keyof SelectMapType, SelectMapType[keyof SelectMapType]>
>({
  key: 'selectMap',
  default: {
    visitor: '',
    thought: '',
    score: '',
  },
});
export const modalOpenState = atom<boolean>({
  key: 'modalOpen',
  default: false,
});
