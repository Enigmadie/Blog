/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Authentication } from 'interfaces';
import { selectErrorMessage } from 'utils';

import { AppThunk } from '../init';
import routes from '../routes';

interface IsAdminInterface {
  status: boolean;
  validationState?: 'valid' | 'invalid';
}

axios.defaults.withCredentials = true;

const initialState = {
  status: false,
  validationState: 'valid',
};

const slice = createSlice({
  name: 'isAdmin',
  initialState,
  reducers: {
    initAdminState(state, action: PayloadAction<IsAdminInterface>) {
      const { status } = action.payload;
      state.status = status;
    },
    authenticationAdminSuccess(state, action: PayloadAction<IsAdminInterface>) {
      const { status } = action.payload;
      state.status = status;
      state.validationState = 'valid';
    },
    authenticationAdminFailure(state) {
      state.validationState = 'invalid';
    },
  },
});

const {
  authenticationAdminSuccess,
  authenticationAdminFailure,
} = slice.actions;

const authenticationAdmin = (authenticationData: Authentication): AppThunk => async (dispatch) => {
  const { login, password } = authenticationData;
  try {
    const response = await axios.post(routes.adminPath(), { data: { login, password } });
    dispatch(authenticationAdminSuccess({ status: response.data }));
  } catch (e) {
    dispatch(authenticationAdminFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const { actions } = slice;

export { actions as isAdminActions, authenticationAdmin };

export default slice.reducer;
