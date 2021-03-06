/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import url from 'url';
import _ from 'lodash';
import { Post } from 'interfaces';
import { selectErrorMessage } from 'utils';

import { AppThunk } from '../init';
import routes from '../routes';

interface PostsInterface {
  data: Post[];
  allPostsCount: number;
}

const initialState: PostsInterface = {
  data: [],
  allPostsCount: 0,
};

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    initPostsState(state, action: PayloadAction<PostsInterface>): void {
      const { data, allPostsCount } = action.payload;
      state.data = data;
      state.allPostsCount = allPostsCount;
    },
    addPostSuccess(state, action: PayloadAction<Post>): void {
      const { payload } = action;
      state.data.unshift(payload);
    },
    editPostSuccess(state, action: PayloadAction<Post>): void {
      const { payload } = action;
      const { id } = payload;
      const currentPostId = _.findIndex(state.data, { id });
      state.data[currentPostId] = payload;
    },
    removePostSuccess(state, action: PayloadAction<PostsInterface>): void {
      const { data, allPostsCount } = action.payload;
      state.data = data;
      state.allPostsCount = allPostsCount;
    },
  },
});

const {
  addPostSuccess,
  editPostSuccess,
  removePostSuccess,
} = slice.actions;

const addPost = (formData: FormData): AppThunk => async (dispatch): Promise<void> => {
  try {
    const response = await axios.post(routes.postPath(), formData);
    dispatch(addPostSuccess(response.data));
  } catch (e) {
    selectErrorMessage(e);
    throw e;
  }
};

const editPost = (id: string, formData: FormData): AppThunk => async (dispatch): Promise<void> => {
  try {
    const response = await axios.patch(routes.postPath(id), formData);
    dispatch(editPostSuccess(response.data));
  } catch (e) {
    selectErrorMessage(e);
    throw e;
  }
};

const removePost = (id: string): AppThunk => async (dispatch): Promise<void> => {
  try {
    await axios.delete(routes.postPath(id));
    const { query } = url.parse(window.location.href, true);
    const currentPage = query.page ? query.page : 1;
    const fetchUrl = routes.postsApiPath({
      page: currentPage,
      limit: 12,
    });
    const { data: { posts, postsCount } } = await axios.get(fetchUrl);
    dispatch(removePostSuccess({ data: posts, allPostsCount: postsCount }));
  } catch (e) {
    selectErrorMessage(e);
    throw e;
  }
};

const { actions } = slice;

export {
  actions as postsActions,
  addPost,
  editPost,
  removePost,
};

export default slice.reducer;
