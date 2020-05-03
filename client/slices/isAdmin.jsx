/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import selectErrorMessage from '../utils';
import routes from '../routes';

const slice = createSlice({
  name: 'isAdmin',
  initialState: {
    status: false,
    validationState: 'valid',
  },
  reducers: {
    initAdminState(state, { payload: { isAdmin } }) {
      state.status = isAdmin;
    },
    authenticationAdminSuccess(state, { payload: { isAdmin } }) {
      state.status = isAdmin;
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

const authenticationAdmin = ({ login, password }) => async (dispatch) => {
  try {
    const response = await axios.post(routes.adminPath(), { data: { login, password } });
    dispatch(authenticationAdminSuccess({ isAdmin: response.data }));
  } catch (e) {
    dispatch(authenticationAdminFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const { actions } = slice;

export { actions, authenticationAdmin };

export default slice.reducer;
