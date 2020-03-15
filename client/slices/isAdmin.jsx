import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: false,
};

const slice = createSlice({
  name: 'isAdmin',
  initialState,
  reducers: {
    initAdminState(state, { payload: { isAdmin } }) {
      state.data = isAdmin;
    },
    authenticationAdminSuccess(state, { payload: { isAdmin } }) {
      state.status = isAdmin
    },
  },
});

const {
  authenticationAdminSuccess,
} = slice.actions;

const authenticationAdmin = ({ login, password }) => async (dispatch) => {
  try {
    const response = await axios.post('/admin', { data: { login, password } });
    dispatch(authenticationAdminSuccess({ isAdmin: response.data }));
  } catch(e) {
    throw e;
  }
};

const { actions } = slice;

export { actions, authenticationAdmin };

export default slice.reducer;

