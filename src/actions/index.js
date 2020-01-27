import { createAction } from 'redux-actions';
import axios from 'axios';

export const addPostSuccess = createAction('ADD_POST');

export const removePostSuccess = createAction('REMOVE_POST_SUCCESS');
export const removePostRequest = createAction('REMOVE_POST_REQUEST');
export const removePostFailure = createAction('REMOVE_POST_FAILURE');

export const fetchDataFromServerSuccess = createAction('FETCH_DATA_FROM_SERVER_SUCCESS');
export const fetchDataFromServerRequest = createAction('FETCH_DATA_FROM_SERVER_REQUEST');
export const fetchDataFromServerFailure = createAction('FETCH_DATA_FROM_SERVER_FAILURE');

export const fetchDataFromServer = () => async (dispatch) => {
  dispatch(fetchDataFromServerRequest());
  try {
    const response = await axios.get('/posts')
    dispatch(fetchDataFromServerSuccess(response.data));
  } catch (e) {
    dispatch(fetchDataFromServerFailure());
    throw e;
  }
};

export const addPost = ({ formData }) => async (dispatch) => {
  const response = await axios.post('/posts/new', formData)
  console.log(response)
  dispatch(addPostSuccess({ post: response.data }));
  // window.location.assign('/')
};

export const editPost = (id, { formData }) => async (dispatch) => {
  await axios.patch(`/posts/edit/${id}`, formData);
}

export const removePost = (id) => async (dispatch) => {
  dispatch(removePostRequest());
  try {
    await axios.delete('/' + id);
    dispatch(removePostSuccess({ id }))
  } catch(e) {
    dispatch(removePostFailure());
    throw e;
  }
}


