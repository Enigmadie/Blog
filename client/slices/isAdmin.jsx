import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: true,
  processing: false,
};

const slice = createSlice({
  name: 'isAdmin',
  initialState,
  reducers: {
    initAdminState(state, { payload: { isAdmin } }) {
      state.data = isAdmin;
    },
    authenticationAdminRequest(state) {
      state.processing = true;
    },
    authenticationAdminSuccess(state, { payload: { isAdmin } }) {
      state.status = isAdmin
      state.processing = false;
    },
    authenticationAdminFailure(state) {
      state.processing = false;
    },
  },
});

const {
  authenticationAdminRequest,
  authenticationAdminSuccess,
  authenticationAdminFailure,
} = slice.actions;

const authenticationAdmin = ({ login, password }) => async (dispatch) => {
  dispatch(authenticationAdminRequest());
  try {
    const response = await axios.post('/admin', { data: { login, password } });
    dispatch(authenticationAdminSuccess({ isAdmin: response.data }));
  } catch(e) {
    dispatch(authenticationAdminFailure());
    throw e;
  }
};

const { actions } = slice;

export { actions, authenticationAdmin };

export default slice.reducer;

