/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiInterface {
  commentsSort: string;
}

const initialState = {
  commentsSort: 'created_at',
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    switchCommentsSort(state, action: PayloadAction<UiInterface>): void {
      const { commentsSort } = action.payload;
      state.commentsSort = commentsSort;
    },
  },
});

const { actions } = slice;
export { actions as uiActions };

export default slice.reducer;
