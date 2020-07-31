/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Authentication } from 'interfaces';
import { selectErrorMessage } from 'utils';

import { AppThunk } from '../init';
import routes from '../routes';

interface ProfileInterface {
  login: string;
  isAdmin: boolean;
  validationState?: 'valid' | 'invalid';
}

axios.defaults.withCredentials = true;

const initialState = {
  login: '',
  isAdmin: false,
  validationState: 'valid',
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    initAdminState(state): void {
      state.isAdmin = true;
    },
    authenticationProfileSuccess(state, action: PayloadAction<ProfileInterface>): void {
      const { login, isAdmin } = action.payload;
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
      login: response.data.login,
      isAdmin: response.data.isAdmin,
    }));
  } catch (e) {
    dispatch(authenticationProfileFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const { actions } = slice;

export { actions as profileActions, authenticationProfile, registrationProfile };

export default slice.reducer;
