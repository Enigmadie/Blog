import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import axios from 'axios';

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

const initialState = {
  processing: false,
};

const slice = createSlice({
  name: 'fetchState',
  initialState,
  reducers: {
    fetchDataFromServerRequest(state) {
      state.processing = true;
    },
    fetchDataFromServerSuccess(state) {
      state.processing = false;
    },
    fetchDataFromServerFailure(state) {
      state.processing = false;
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
    const { data: { isAdmin, posts, postsCount, currentPage } } = await axios.get(fetchUrl);
    dispatch(actions.initPostsState({ posts, postsCount }));
    dispatch(actions.initAdminState({ isAdmin }));
    dispatch(actions.initCurrentPageState({ currentPage }));
    dispatch(fetchDataFromServerSuccess());
  } catch(e) {
    dispatch(fetchDataFromServerFailure());
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
