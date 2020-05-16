/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from 'interfaces';

interface ActivePostInterface {
  post: Post | any;
}

const initialState: ActivePostInterface = {
  post: {},
};

const slice = createSlice({
  name: 'activePost',
  initialState,
  reducers: {
    initActivePostState(state, action: PayloadAction<ActivePostInterface>) {
      const { post } = action.payload;
      state.post = post;
    },
  },
});

const { actions } = slice;

export { actions as activePostActions };

export default slice.reducer;
