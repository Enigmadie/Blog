/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectErrorMessage, mapCategories } from 'utils';

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

const fetchPostsData = (page: number, limit = 12): AppThunk => async (dispatch): Promise<void> => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.postsApiPath({
      page,
      offset: limit * (Number(page) - 1),
      limit,
      order: 'created_at',
    });
    const { data: { posts, postsCount } } = await axios.get(fetchUrl);
    dispatch(actions.initPostsState({
      data: mapCategories(posts),
      allPostsCount: postsCount,
    }));
    dispatch(fetchDataFromServerSuccess());
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const fetchCategoryData = (category: string): AppThunk => async (dispatch): Promise<void> => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.postsApiPath({
      category,
      limit: 20,
      order: 'created_at',
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

const fetchActivePostData = (id: string): AppThunk => async (dispatch): Promise<void> => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.postsApiPath({
      id,
    });
    const { data: { posts } } = await axios.get(fetchUrl);

    const post = mapCategories(posts);
    dispatch(actions.initActivePostData({
      post: post[0],
    }));
    dispatch(fetchDataFromServerSuccess());
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    selectErrorMessage(e);
    throw e;
  }
};


const fetchActivePostComments = (id: string): AppThunk => async (dispatch): Promise<void> => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.commentsApiPath({
      postId: id,
    });
    const { data: { comments } } = await axios.get(fetchUrl);
    dispatch(actions.initActivePostComments({ comments }));
    dispatch(fetchDataFromServerSuccess());
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const fetchAdminData = (): AppThunk => async (dispatch): Promise<void> => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = routes.adminApiPath();
    const { data } = await axios.get(fetchUrl);
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
  fetchActivePostComments,
  fetchActivePostData,
  fetchAdminData,
  fetchCategoryData,
};

export default slice.reducer;
