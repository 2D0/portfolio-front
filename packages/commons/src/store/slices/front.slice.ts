import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  SelectMapType,
  NavNames,
} from './../../../../../apps/front/interface';

export interface FrontStateType {
  chatStep: number;
  userName: string;
  chatAnswear: string;
  selectMap: Record<keyof SelectMapType, SelectMapType[keyof SelectMapType]>;
  isChatOpen: boolean;
  navSelectName: NavNames;
  navScrollName: NavNames;
  isMenuOpen: boolean;
}

const initialState: FrontStateType = {
  chatStep: 1,
  userName: '',
  chatAnswear: '',
  selectMap: {
    visitor: '',
    thought: '',
    score: '',
  },
  isChatOpen: false,
  navSelectName: 'HOME',
  navScrollName: 'HOME',
  isMenuOpen: false,
};

const frontSlice = createSlice({
  name: 'front',
  initialState,
  reducers: {
    setChatStep(state, action: PayloadAction<number>) {
      state.chatStep = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    setChatAnswear(state, action: PayloadAction<string>) {
      state.chatAnswear = action.payload;
    },
    setSelectMap(state, action: PayloadAction<FrontStateType['selectMap']>) {
      state.selectMap = action.payload;
    },
    setIsChatOpen(state, action: PayloadAction<boolean>) {
      state.isChatOpen = action.payload;
    },
    setNavSelectName(state, action: PayloadAction<NavNames>) {
      state.navSelectName = action.payload;
    },
    setNavScrollName(state, action: PayloadAction<NavNames>) {
      state.navScrollName = action.payload;
    },
    setIsMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMenuOpen = action.payload;
    },
  },
});

export const {
  setChatStep,
  setUserName,
  setChatAnswear,
  setSelectMap,
  setIsChatOpen,
  setNavSelectName,
  setNavScrollName,
  setIsMenuOpen,
} = frontSlice.actions;
export default frontSlice.reducer;
