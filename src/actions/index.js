import { createAction } from 'redux-actions';
import axios from 'axios';


export const addPostSuccess = createAction('ADD_POST');
export const selectPage = createAction('SELECT_PAGE');

export const removePostSuccess = createAction('REMOVE_POST_SUCCESS');
export const removePostRequest = createAction('REMOVE_POST_REQUEST');
export const removePostFailure = createAction('REMOVE_POST_FAILURE');

export const authenticationAdminSuccess = createAction('AUTHENTICATION_ADMIN_SUCCESS');
export const authenticationAdminRequest = createAction('AUTHENTICATION_ADMIN_REQUEST');
export const authenticationAdminFailure = createAction('AUTHENTICATION_ADMIN_FAILURE');

export const fetchDataFromServerSuccess = createAction('FETCH_DATA_FROM_SERVER_SUCCESS');
export const fetchDataFromServerRequest = createAction('FETCH_DATA_FROM_SERVER_REQUEST');
export const fetchDataFromServerFailure = createAction('FETCH_DATA_FROM_SERVER_FAILURE');

export const fetchDataFromServer = ({ currentPage }) => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const { data } = await axios.get(`/posts/?page=${currentPage}`)
    dispatch(fetchDataFromServerSuccess({ isAdmin: data.isAdmin, posts: data.posts, currentPage: data.currentPage  }));
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    throw e;
  }
};

export const authenticationAdmin = ({ login, password }) => async (dispatch) => {
  dispatch(authenticationAdminRequest());
  try {
    const response = await axios.post('/admin', { data: { login, password } });
    dispatch(authenticationAdminSuccess({ isAdmin: response.data }));
  } catch (e) {
    dispatch(authenticationAdminFailure());
    throw e;
  }
};

export const addPost = ({ formData }) => async (dispatch) => {
  const response = await axios.post('/posts/new', formData)
  dispatch(addPostSuccess({ post: { ...response.data, date: new Date() } }));
  // window.location.assign('/')
};

export const editPost = (id, { formData }) => async (dispatch) => {
  await axios.patch(`/posts/edit/${id}`, formData);
};

export const removePost = (id) => async (dispatch) => {
  dispatch(removePostRequest());
  try {
    await axios.delete('/' + id);
    dispatch(removePostSuccess({ id }))
  } catch(e) {
    dispatch(removePostFailure());
    throw e;
  }
};

