import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const isAdmin = handleActions({
  [actions.getDataFromGon](state, { payload: { isAdmin } }) {
    return isAdmin;
  }
}, false);

const posts = handleActions({
  [actions.getDataFromGon](state, { payload: { posts } }) {
    return posts;
  },
  [actions.addPostSuccess](state, { payload: { title, content, file } }) {
    return [...state.posts, { title, content, file }]
  },
}, []);

const mode = handleActions({
  [actions.getDataFromGon](state, { payload: { mode } }) {
    return mode;
  }
}, '');

export default combineReducers({ posts, isAdmin, mode });
