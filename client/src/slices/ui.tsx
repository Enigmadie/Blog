/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  commentsSort: 'created_at',
  inputShowing: false,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    switchCommentsSort(state, action: PayloadAction<string>): void {
      state.commentsSort = action.payload;
    },
    setInputShowing(state, action: PayloadAction<boolean>): void {
      state.inputShowing = action.payload;
    },
  },
});

const { actions } = slice;
export { actions as uiActions };

export default slice.reducer;
