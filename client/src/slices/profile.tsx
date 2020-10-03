/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Authentication, Registration, NewPassword } from 'interfaces';
import { selectErrorMessage, successMessage, warningMessage } from 'utils';
import jwtDecode from 'jwt-decode';

import { AppThunk } from '../init';
import routes from '../routes';

interface ProfileInterface {
  id: string;
  login: string;
  isAdmin: boolean;
  avatar: string;
  avatarSmall: string;
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
  avatar: '',
  avatarSmall: '',
  isAdmin: false,
  validationState: 'valid',
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    authenticationProfileSuccess(state, action: PayloadAction<ProfileInterface>): void {
      const {
        login,
        isAdmin,
        id,
        avatar,
        avatarSmall,
      } = action.payload;

      state.id = id;
      state.avatar = avatar;
      state.avatarSmall = avatarSmall;
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
  logoutProfile,
} = slice.actions;

const registrationProfile = (
  registrationData: Registration,
): AppThunk => async (dispatch): Promise<void> => {
  const {
    login,
    password,
    avatar,
    avatarSmall,
  } = registrationData;
  try {
    await axios.post(routes.registryPath(), {
      data: {
        login,
        password,
        avatar,
        avatarSmall,
      },
    });
  } catch (e) {
    dispatch(registrationProfileFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const authenticationProfile = (
  authenticationData: Authentication,
): AppThunk => async (dispatch): Promise<void> => {
  const { login, password } = authenticationData;
  try {
    const response = await axios.post(routes.authPath(), { data: { login, password } });
    dispatch(authenticationProfileSuccess({
      id: response.data.id,
      login: response.data.login,
      isAdmin: response.data.isAdmin,
      avatar: response.data.avatar,
      avatarSmall: response.data.avatarSmall,
    }));
    localStorage.setItem('authorization', response.data.token);
    axios.defaults.headers.common.authorization = localStorage.getItem('authorization');
  } catch (e) {
    dispatch(authenticationProfileFailure());
    selectErrorMessage(e);
    throw e;
  }
};

const checkAuthToken = () => (dispatch): void => {
  if (isAuth) {
    const decodedData = jwtDecode(isAuth);
    const {
      id,
      login,
      isAdmin,
      avatar,
      avatarSmall,
    } = decodedData;

    dispatch(authenticationProfileSuccess({
      id,
      login,
      isAdmin,
      avatar,
      avatarSmall,
    }));
  }
};

const changePassword = (passwordData: NewPassword) => async (dispatch): Promise<void> => {
  if (isAuth) {
    const { oldPassword, newPassword } = passwordData;
    const { login } = jwtDecode(isAuth);
    try {
      const response = await axios.patch(routes.changePasswordPath(), {
        data: { login, oldPassword, newPassword },
      });
      if (response.status === 200) {
        localStorage.setItem('authorization', '');
        dispatch(logoutProfile());
        successMessage('successChangePassword');
      }
    } catch (e) {
      if (e.response.data === 'Password is not equal') {
        warningMessage('warningChangePassword');
      } else {
        dispatch(authenticationProfileFailure());
        selectErrorMessage(e);
      }
      throw e;
    }
  }
};

const { actions } = slice;

export {
  actions as profileActions,
  checkAuthToken,
  authenticationProfile,
  registrationProfile,
  changePassword,
};

export default slice.reducer;
