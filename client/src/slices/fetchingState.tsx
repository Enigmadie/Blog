/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectErrorMessage } from 'utils';

import { actions } from './index';
import { AppThunk } from '../init';
import routes from '../routes';

interface FetchingStateInterface {
  processing: boolean;
  validationState: 'valid' | 'invalid';
}

const initialState: FetchingStateInterface = {
  processing: false,
  validationState: 'valid',
};

const slice = createSlice({
  name: 'fetchingState',
  initialState,
  reducers: {
    fetchDataFromServerRequest(state: FetchingStateInterface): void {
      state.processing = true;
    },
    fetchDataFromServerSuccess(state: FetchingStateInterface): void {
      state.processing = false;
      state.validationState = 'valid';
    },
    fetchDataFromServerFailure(state: FetchingStateInterface): void {
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

const fetchPostsData = (page: number): AppThunk => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.postsPath({
      name: 'main',
      page,
      limit: 12,
    });
    const { data: { posts, postsCount } } = await axios.get(fetchUrl);
    dispatch(actions.initPostsState({ data: posts, allPostsCount: postsCount }));
    /* dispatch(actions.initCurrentPageState({ page })); */
    dispatch(fetchDataFromServerSuccess());
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const fetchCategoryData = (category: string): AppThunk => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.postsPath({
      name: 'category',
      limit: 20,
      category,
    });
    const { data: { posts, postsCount } } = await axios.get(fetchUrl);
    dispatch(actions.initPostsState({ data: posts, allPostsCount: postsCount }));
    dispatch(fetchDataFromServerSuccess());
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const fetchActivePostData = (id: string): AppThunk => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.postsPath({
      name: 'post',
      id,
    });
    const { data: { posts } } = await axios.get(fetchUrl);
    dispatch(actions.initActivePostState({ post: posts }));
    dispatch(fetchDataFromServerSuccess());
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const fetchAdminData = (): AppThunk => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.adminApiPath();
    const { data } = await axios.get(fetchUrl);
    console.log(data)
    dispatch(actions.initAdminState({ status: data.isAdmin }));
    dispatch(fetchDataFromServerSuccess());
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const fetchingStateActions = slice.actions;

export {
  fetchingStateActions,
  fetchPostsData,
  fetchActivePostData,
  fetchAdminData,
  fetchCategoryData,
};

export default slice.reducer;
