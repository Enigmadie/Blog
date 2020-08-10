/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Authentication } from 'interfaces';
import { selectErrorMessage } from 'utils';
import jwtDecode from 'jwt-decode';

import { AppThunk } from '../init';
import routes from '../routes';

interface ProfileInterface {
  id: string;
  login: string;
  isAdmin: boolean;
  validationState?: 'valid' | 'invalid';
}

axios.defaults.withCredentials = true;
const isAuth = localStorage.getItem('authorization');
axios.defaults.headers.common.authorization = isAuth
  ? localStorage.getItem('authorization')
  : '';


const initialState = {
  id: '',
  login: '',
  isAdmin: false,
  validationState: 'valid',
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    authenticationProfileSuccess(state, action: PayloadAction<ProfileInterface>): void {
      const { login, isAdmin, id } = action.payload;
      state.id = id;
      state.login = login;
      state.isAdmin = isAdmin;
      state.validationState = 'valid';
    },
    authenticationProfileFailure(state): void {
      state.validationState = 'invalid';
    },
    registrationProfileSuccess(state): void {
      state.validationState = 'valid';
    },
    registrationProfileFailure(state): void {
      state.validationState = 'invalid';
    },
    logoutProfile(state): void {
      state.login = '';
      state.isAdmin = false;
    },
  },
});

const {
  authenticationProfileSuccess,
  authenticationProfileFailure,
  /* registrationProfileSuccess, */
  registrationProfileFailure,
} = slice.actions;

const registrationProfile = (
  authenticationData: Authentication,
): AppThunk => async (dispatch) => {
  const { login, password } = authenticationData;
  try {
    await axios.post(routes.registryPath(), { data: { login, password } });
  } catch (e) {
    dispatch(registrationProfileFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const authenticationProfile = (
  authenticationData: Authentication,
): AppThunk => async (dispatch) => {
  const { login, password } = authenticationData;
  try {
    const response = await axios.post(routes.authPath(), { data: { login, password } });
    dispatch(authenticationProfileSuccess({
      id: response.data.id,
      login: response.data.login,
      isAdmin: response.data.isAdmin,
    }));
    localStorage.setItem('authorization', response.data.token);
    axios.defaults.headers.common.authorization = localStorage.getItem('authorization');
  } catch (e) {
    dispatch(authenticationProfileFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const checkAuthToken = () => (dispatch) => {
  if (isAuth) {
    const decodedData = jwtDecode(isAuth);
    const { id, login, isAdmin } = decodedData;

    dispatch(authenticationProfileSuccess({
      id,
      login,
      isAdmin,
    }));
  }
};

const { actions } = slice;

export {
  actions as profileActions,
  checkAuthToken,
  authenticationProfile,
  registrationProfile,
};

export default slice.reducer;
