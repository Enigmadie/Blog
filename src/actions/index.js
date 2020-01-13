import { createAction } from 'redux-actions';
import axios from 'axios';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');

export const addPostSuccess = createAction('ADD_POST');

export const addPost = ({ title, content, file }) => async () => {
  await axios.post('/', { data: { title, content, file } });
};

