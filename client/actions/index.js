import { createAction } from 'redux-actions';
import axios from 'axios';


export const addPostSuccess = createAction('ADD_POST');

export const removePostSuccess = createAction('REMOVE_POST_SUCCESS');
export const removePostRequest = createAction('REMOVE_POST_REQUEST');
export const removePostFailure = createAction('REMOVE_POST_FAILURE');

export const authenticationAdminSuccess = createAction('AUTHENTICATION_ADMIN_SUCCESS');
export const authenticationAdminRequest = createAction('AUTHENTICATION_ADMIN_REQUEST');
export const authenticationAdminFailure = createAction('AUTHENTICATION_ADMIN_FAILURE');

export const fetchDataFromServerSuccess = createAction('FETCH_DATA_FROM_SERVER_SUCCESS');
export const fetchDataFromServerRequest = createAction('FETCH_DATA_FROM_SERVER_REQUEST');
export const fetchDataFromServerFailure = createAction('FETCH_DATA_FROM_SERVER_FAILURE');

export const editPostSuccess = createAction('EDIT_POST_SUCCESS');
export const editPostRequest = createAction('EDIT_POST_REQUEST');
export const editPostFailure = createAction('EDIT_POST_FAILURE');

export const fetchDataFromServer = (pageData) => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const fetchUrl = pageData !== null ? `/posts/?page=${pageData.currentPage}` : '/posts';
    const { data: { isAdmin, posts, postsCount, currentPage } } = await axios.get(fetchUrl);
    dispatch(fetchDataFromServerSuccess({ isAdmin, posts, postsCount, currentPage }));
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
  dispatch(addPostSuccess({ post: { ...response.data } }));
  // window.location.assign('/')
};

export const editPost = (id, { formData }) => async (dispatch) => {
  dispatch(editPostRequest());
  try {
    const response = await axios.patch(`/post/${id}`, formData);
    dispatch(editPostSuccess({ post: response.data }));
  } catch(e) {
    dispatch(editPostFailure());
    throw e;
  }
};

export const removePost = (id) => async (dispatch) => {
  dispatch(removePostRequest());
  try {
    await axios.delete(`/post/${id}`);
    const response = await axios.get('/posts');
    console.log(response.data)
    dispatch(removePostSuccess({ posts: response.data.posts }))
  } catch(e) {
    dispatch(removePostFailure());
    throw e;
  }
};

