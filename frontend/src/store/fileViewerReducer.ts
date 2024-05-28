import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface fileViwerState {
  id: string | null;
  data: Record<string, any>[];
  page: number;
  count: number;
  sort: number;
  sortIndex: number;
  searchText: string;
  totalCount: number;
}

const initialState: fileViwerState = {
  id: null,
  data: [],
  page: 1,
  count: 10,
  sort: 1,
  sortIndex: 0,
  searchText: "",
  totalCount: 10,
};

const fileViewerSlice = createSlice({
  name: 'fileViewer',
  initialState,
  reducers: {
    setFileId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setData: (state, action: PayloadAction<Record<string, string>[]>) => {
      state.data = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<number>) => {
      state.sort = action.payload;
    },
    setSortIndexDirection: (state, action: PayloadAction<number>) => {
      state.sortIndex = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },

  },
});

export const {
  setFileId,
  setPage,
  setCount,
  setSearchText,
  setData,
  setSortDirection,
  setSortIndexDirection,
  setTotalCount
} = fileViewerSlice.actions;

export const selectedData = (state: RootState) => state.fileViewer.data;

export default fileViewerSlice.reducer;