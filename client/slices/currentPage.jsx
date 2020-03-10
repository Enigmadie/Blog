import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
};

const slice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    initCurrentPageState(state, { payload: { currentPage } }) {
      state.currentPage = currentPage;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
