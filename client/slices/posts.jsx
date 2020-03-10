import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

const initialState = {
  data: { byId: {}, allIds: [] },
  allPostsCount: 0,
  processing: false,
};

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    initPostsState(state, { payload: { posts, postsCount } }) {
      state.data = {
        byId: _.keyBy(posts, '_id'),
        allIds: posts.map((el) => el._id),
      };
      state.allPostsCount = postsCount;
    },
    addPostRequest(state) {
      state.processing = true;
    },
    addPostSuccess(state, { payload: { post } }) {
      const { byId, allIds } = state.data;
      const { _id } = post;
      state.data = {
        byId: {[_id]: post, ...byId },
        allIds: [_id, ...allIds],
      };
    },
    addPostFailure(state) {
      state.processing = false;
    },
    editPostRequest(state) {
      state.processing = true;
    },
    editPostSuccess(state, { payload: { post } }) {
      const { _id } = post;
      const { byId, allIds } = state.data;
      byId[_id] = post;
      state.data = {
        byId,
        allIds,
      };
    },
    editPostFailure(state) {
      state.processing = false;
    },
    removePostRequest(state) {
      state.processing = true;
    },
    removePostSuccess(state) {
      state.data =  {
        byId: _.keyBy(posts, '_id'),
        allIds: posts.map((el) => el._id),
      };
    },
    removePostFailure(state) {
      state.processing = false;
    },
  },
});

const {
  addPostRequest,
  addPostFailue,
  addPostSuccess,
  editPostRequest,
  editPostFailure,
  editPostSuccess,
  removePostRequest,
  removePostFailure,
  removePostSuccess,
} = slice.actions;

const addPost = ({ formData }) => async (dispatch) => {
  dispatch(addPostRequest());
  try {
    const response = await axios.post('/posts/new', formData)
    dispatch(addPostSuccess({ post: { ...response.data } }));
  } catch(e) {
    dispatch(addPostFailue());
    throw e;
  }
};

const editPost = (id, { formData }) => async (dispatch) => {
  dispatch(editPostRequest());
  try {
    const response = await axios.patch(`/post/${id}`, formData);
    dispatch(editPostSuccess({ post: response.data }));
  } catch(e) {
    dispatch(editPostFailure());
    throw e;
  }
};

const removePost = (id) => async (dispatch) => {
  dispatch(removePostRequest());
  try {
    await axios.delete(`/post/${id}`);
    const response = await axios.get('/posts');
    dispatch(removePostSuccess({ posts: response.data.posts }))
  } catch(e) {
    dispatch(removePostFailure());
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
