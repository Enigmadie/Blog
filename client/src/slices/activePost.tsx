/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post, Comment } from 'interfaces';
import { selectErrorMessage } from 'utils';
import _ from 'lodash';

import { AppThunk } from '../init';
import routes from '../routes';

interface PostInterface {
  post: Post | any;
}

interface ActivePostCommentsInterface {
  comments: Comment[];
}

interface ActivePostInterface {
  post: Post | any;
  comments: Comment[];
}

const initialState: ActivePostInterface = {
  post: {},
  comments: [],
};

const slice = createSlice({
  name: 'activePost',
  initialState,
  reducers: {
    initActivePostData(state, action: PayloadAction<PostInterface>): void {
      const { post } = action.payload;
      state.post = post;
    },
    initActivePostComments(state, action: PayloadAction<ActivePostCommentsInterface>): void {
      const { comments } = action.payload;
      state.comments = comments;
    },
    addCommentSuccess(state, action: PayloadAction<Comment>): void {
      const { payload } = action;
      state.comments.unshift(payload);
    },
    editCommentSuccess(state, action: PayloadAction<Comment>): void {
      const { payload } = action;
      const { id } = payload;
      const currentCommentId = _.findIndex(state.comments, { id });
      state.comments[currentCommentId] = payload;
    },
    removeCommentSuccess(state, action: PayloadAction<Comment>): void {
      const { payload } = action;
      state.comments.unshift(payload);
    },
  },
});

const { actions } = slice;

const {
  addCommentSuccess,
  editCommentSuccess,
  removeCommentSuccess,
} = slice.actions;

const addComment = (id: string, content: string): AppThunk => async (dispatch): Promise<void> => {
  try {
    const response = await axios.post(routes.commentPath(), {
      content,
      postId: id,
    });
    dispatch(addCommentSuccess(response.data));
  } catch (e) {
    selectErrorMessage(e);
    throw e;
  }
};

export {
  actions as activePostActions,
  addComment,
};

export default slice.reducer;
