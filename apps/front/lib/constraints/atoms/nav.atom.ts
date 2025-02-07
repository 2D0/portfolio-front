import { atom } from 'recoil';
import type { NavNames } from '@/interface';

export const navSelectNameState = atom<NavNames>({
  key: 'navSelectName',
  default: 'HOME',
});
export const scrollNameNameState = atom<NavNames>({
  key: 'scrollNameName',
  default: 'HOME',
});
export const menuOpenState = atom<boolean>({
  key: 'menuOpen',
  default: false,
});
