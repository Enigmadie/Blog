/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import url from 'url';
import _ from 'lodash';

import routes from '../routes';
import selectErrorMessage from '../utils';

const slice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    allPostsCount: 0,
  },
  reducers: {
    initPostsState(state, { payload: { posts, postsCount } }) {
      state.data = posts;
      state.allPostsCount = postsCount;
    },
    addPostSuccess(state, { payload: { post } }) {
      state.data.unshift(post);
    },
    editPostSuccess(state, { payload: { post } }) {
      const { _id } = post;
      const currentPostId = _.findIndex(state.data, { _id });
      state.data[currentPostId] = post;
    },
    removePostSuccess(state, { payload: { posts } }) {
      state.data = posts;
    },
  },
});

const {
  addPostSuccess,
  editPostSuccess,
  removePostSuccess,
} = slice.actions;

const addPost = ({ formData }) => async (dispatch) => {
  try {
    const response = await axios.post('/posts/new', formData);
    dispatch(addPostSuccess({ post: { ...response.data } }));
  } catch (e) {
    selectErrorMessage(e);
    throw e;
  }
};

const editPost = (id, { formData }) => async (dispatch) => {
  try {
    const response = await axios.patch(`/post/${id}`, formData);
    dispatch(editPostSuccess({ post: response.data }));
  } catch (e) {
    selectErrorMessage(e);
    throw e;
  }
};

const removePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/post/${id}`);
    const { query } = url.parse(window.location.href, true);
    const currentPage = query.page ? query.page : 1;
    const fetchUrl = routes.postsPath({
      page: currentPage,
      limit: 12,
    });
    const { data } = await axios.get(fetchUrl);
    dispatch(removePostSuccess({ posts: data.posts }));
  } catch (e) {
    selectErrorMessage(e);
    throw e;
  }
};

const { actions } = slice;

export {
  actions,
  addPost,
  editPost,
  removePost,
};

export default slice.reducer;
