import { configureStore } from '@reduxjs/toolkit';
import frontSlice from './slices/front.slice';

export const store = configureStore({
  reducer: {
    front: frontSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
