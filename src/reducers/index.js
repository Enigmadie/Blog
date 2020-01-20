import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
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
  [actions.addPostSuccess](state, { payload: { post } }) {
    const { title, content, image } = post;
    return [...state, { title, content, image }];
  },
  [actions.removePostSuccess](state, { payload: { id } }) {
    const filtered = state.filter(el => el._id !== id);
    return filtered;
  },
}, []);

const mode = handleActions({
  [actions.getDataFromGon](state, { payload: { mode } }) {
    return mode;
  }
}, '');

const postRemovingState = handleActions({
  [actions.removePostRequest]() {
    return 'requested';
  },
  [actions.removePostFailure]() {
    return 'failed';
  },
  [actions.removePostSuccess]() {
    return 'finished';
  },
}, 'none');

export default combineReducers({ posts, isAdmin, mode, postRemovingState });
