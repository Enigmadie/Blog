/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: {},
};

const slice = createSlice({
  name: 'activePost',
  initialState,
  reducers: {
    initActivePostState(state, { payload: { activePost } }) {
      state.post = activePost;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
