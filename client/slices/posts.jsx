/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

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
    removePostSuccess(state) {
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
    const response = await axios.post('/posts/new', formData)
    dispatch(addPostSuccess({ post: { ...response.data } }));
  } catch(e) {
    throw e;
  }
};

const editPost = (id, { formData }) => async (dispatch) => {
  try {
    const response = await axios.patch(`/post/${id}`, formData);
    dispatch(editPostSuccess({ post: response.data }));
  } catch(e) {
    throw e;
  }
};

const removePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/post/${id}`);
    const response = await axios.get('/posts');
    dispatch(removePostSuccess({ posts: response.data.posts }))
  } catch(e) {
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
