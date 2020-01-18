import { createAction } from 'redux-actions';
import axios from 'axios';

export const addPostSuccess = createAction('ADD_POST');
export const getDataFromGon = createAction('GET_DATA_FROM_GON')

export const addPost = ({ title, content, file }) => async () => {
  await axios.post('/', file, { headers: { 'Content-Type': 'multipart/form/data' } })
  console.log(file)
    // { data: { title, content, file } })
    // {
    // headers: { 'Content-Type': 'multipart/form-data' },
  // });
  // await axios.post({
  //   method: 'post',
  //   url: '/',
  //   data: {title, content, file},
  //   config: { headers: { "Content-Type": "multipart/form-data" } }
  // })
};


