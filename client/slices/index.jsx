/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import axios from 'axios';

import selectErrorMessage from '../utils';

import posts, {
  actions as postsActions,
  addPost,
  editPost,
  removePost,
} from './posts.jsx';
import isAdmin, { actions as isAdminActions, authenticationAdmin } from './isAdmin.jsx';
import currentPage, { actions as currentPageActions } from './currentPage.jsx';

const actions = {
  ...postsActions,
  ...isAdminActions,
  ...currentPageActions,
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

export const fetchDataFromServer = (pageData) => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = pageData !== null ? `/posts/?page=${pageData.currentPage}` : '/posts';
    const { data } = await axios.get(fetchUrl);

    dispatch(actions.initPostsState({ posts: data.posts, postsCount: data.postsCount }));
    dispatch(actions.initAdminState({ isAdmin: data.isAdmin }));
    dispatch(actions.initCurrentPageState({ currentPage: data.currentPage }));
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
  fetchingState: slice.reducer,
});

export {
  actions,
  asyncActions,
};
