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
    return {
      byId: _.keyBy(posts, '_id'),
      allIds: posts.map((el) => el._id),
    };
  },
  [actions.addPostSuccess](state, { payload: { post } }) {
    const { byId, allIds } = state;
    const { _id, title, content, image } = post;
    return {
      byId: { ...byId, [_id]: { _id, title, content, image } },
      allIds: [_id, ...allIds],
    }
  },
  [actions.removePostSuccess](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    }
  },
}, { byId: {}, allIds: [] });

const activePost = handleActions({
  [actions.getDataFromGon](state, { payload: { activePost } }) {
    return activePost;
  }
}, null);

const editedPost = handleActions({
  [actions.getDataFromGon](state, { payload: { editedPost } }) {
    return editedPost;
  }
}, null);


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

export default combineReducers({ posts, activePost, editedPost, isAdmin, mode, postRemovingState });
