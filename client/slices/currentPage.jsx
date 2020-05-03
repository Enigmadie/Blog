/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
};

const slice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    initCurrentPageState(state, { payload: { currentPage } }) {
      state.page = currentPage;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
