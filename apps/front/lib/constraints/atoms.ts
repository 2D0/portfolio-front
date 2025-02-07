import { atom, RecoilState } from 'recoil';

export const testEndedState: RecoilState<boolean> = atom({
  key: 'testEnded',
  default: false,
});
