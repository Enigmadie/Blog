/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActivePostInterface {
  page: number;
}

const initialState = {
  page: 1,
};

const slice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    initCurrentPageState(state, action: PayloadAction<ActivePostInterface>) {
      const { page } = action.payload;
      state.page = page;
    },
  },
});

const { actions } = slice;

export { actions as currentPageActions };

export default slice.reducer;
