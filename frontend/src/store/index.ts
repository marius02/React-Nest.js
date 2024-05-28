import { configureStore } from '@reduxjs/toolkit';
import fileViewerReducer from './fileViewerReducer';

const store = configureStore({
  reducer: {
    fileViewer: fileViewerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;