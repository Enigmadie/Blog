import { createAction } from 'redux-actions';
import axios from 'axios';

export const addPostSuccess = createAction('ADD_POST');

export const removePostSuccess = createAction('REMOVE_POST_SUCCESS');
export const removePostRequest = createAction('REMOVE_POST_REQUEST');
export const removePostFailure = createAction('REMOVE_POST_FAILURE');

export const getDataFromGon = createAction('GET_DATA_FROM_GON')

export const addPost = ({ formData }) => async (dispatch) => {
  const response = await axios.post('/', formData)
  dispatch(addPostSuccess({ post: response.data }));
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
}


