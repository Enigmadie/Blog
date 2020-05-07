/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import axios from 'axios';

import selectErrorMessage from '../utils';
import routes from '../routes';

import posts, {
  actions as postsActions,
  addPost,
  editPost,
  removePost,
} from './posts.jsx';
import isAdmin, { actions as isAdminActions, authenticationAdmin } from './isAdmin.jsx';
import currentPage, { actions as currentPageActions } from './currentPage.jsx';
import activePost, { actions as activePostActions } from './activePost.jsx';

const actions = {
  ...postsActions,
  ...isAdminActions,
  ...currentPageActions,
  ...activePostActions,
};

const asyncActions = {
  addPost,
  editPost,
  removePost,
  authenticationAdmin,
};

const slice = createSlice({
  name: 'fetchState',
  initialState: {
    processing: false,
    validationState: 'valid',
  },
  reducers: {
    fetchDataFromServerRequest(state) {
      state.processing = true;
    },
    fetchDataFromServerSuccess(state) {
      state.processing = false;
      state.validationState = 'valid';
    },
    fetchDataFromServerFailure(state) {
      state.processing = false;
      state.validationState = 'invalid';
    },
  },
});

const {
  fetchDataFromServerRequest,
  fetchDataFromServerSuccess,
  fetchDataFromServerFailure,
} = slice.actions;

export const fetchPostsData = (queryData) => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.postsPath({
      page: queryData.page,
      limit: 12,
    });
    const { data } = await axios.get(fetchUrl);
    dispatch(actions.initPostsState({ posts: data.posts, postsCount: data.postsCount }));
    dispatch(actions.initCurrentPageState({ currentPage: queryData.page }));
    dispatch(fetchDataFromServerSuccess());
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    selectErrorMessage(e);
    throw e;
  }
};

export const fetchActivePostData = (queryData) => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.postsPath({
      id: queryData.id,
    });
    const { data } = await axios.get(fetchUrl);
    dispatch(actions.initActivePostState({ activePost: data.posts }));
    dispatch(fetchDataFromServerSuccess());
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    selectErrorMessage(e);
    throw e;
  }
};

export const fetchAdminData = () => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.adminApiPath();
    const { data } = await axios.get(fetchUrl);
    console.log(data);
    dispatch(actions.initAdminState({ isAdmin: data.isAdmin }));
    dispatch(fetchDataFromServerSuccess());
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    selectErrorMessage(e);
    throw e;
  }
};

export default combineReducers({
  posts,
  isAdmin,
  currentPage,
  activePost,
  fetchingState: slice.reducer,
});

asyncActions.fetchPostsData = fetchPostsData;
asyncActions.fetchActivePostData = fetchActivePostData;

export {
  actions,
  asyncActions,
};
