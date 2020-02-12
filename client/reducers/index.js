import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

const currentPage = handleActions({
  [actions.fetchDataFromServerSuccess](state, { payload: { currentPage } }) {
    return currentPage;
  },
}, 1);

const postsCount = handleActions({
  [actions.fetchDataFromServerSuccess](state, { payload: { postsCount } }) {
    return postsCount;
  }
}, 0);

const posts = handleActions({
  [actions.fetchDataFromServerSuccess](state, { payload: { posts } }) {
    return {
      byId: _.keyBy(posts, '_id'),
      allIds: posts.map((el) => el._id),
    };
  },
  [actions.addPostSuccess](state, { payload: { post } }) {
    const { byId, allIds } = state;
    const { _id } = post;
    return {
      byId: {[_id]: post, ...byId },
      allIds: [_id, ...allIds],
    };
  },
  [actions.editPostSuccess](state, { payload: { post } }) {
    const { _id } = post;
    const { byId, allIds } = state;
    byId[_id] = post;
    return {
      byId,
      allIds,
    };
  },
  [actions.removePostSuccess](state, { payload: { posts } }) {
    return {
      byId: _.keyBy(posts, '_id'),
      allIds: posts.map((el) => el._id),
    };
  },
}, { byId: {}, allIds: [] });

const isAdmin = handleActions({
  [actions.fetchDataFromServerSuccess](state, { payload: { isAdmin } }) {
    return isAdmin;
  },
  [actions.authenticationAdminSuccess](state, { payload: { isAdmin } }) {
    return isAdmin;
  },
}, false);

const adminAuthentificationState = handleActions({
  [actions.authenticationAdminRequest]() {
    return 'requested';
  },
  [actions.authenticationAdminFailure]() {
    return 'failed';
  },
  [actions.authenticationAdminSuccess]() {
    return 'finished';
  },
}, 'none');

const dataFetchingFromServerState = handleActions({
  [actions.fetchDataFromServerRequest]() {
    return 'requested';
  },
  [actions.fetchDataFromServerFailure]() {
    return 'failed';
  },
  [actions.fetchDataFromServerSuccess]() {
    return 'finished';
  },
}, 'none');

const postAddingState = handleActions({
  [actions.addPostRequest]() {
    return 'requested';
  },
  [actions.addPostFailure]() {
    return 'failed';
  },
  [actions.addPostSuccess]() {
    return 'finished';
  },
}, 'none');

const postEditingState = handleActions({
  [actions.editPostRequest]() {
    return 'requested';
  },
  [actions.editPostFailure]() {
    return 'failed';
  },
  [actions.editPostSuccess]() {
    return 'finished';
  },
}, 'none');

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

export default combineReducers({
  isAdmin,
  currentPage,
  posts,
  postsCount,
  adminAuthentificationState,
  postAddingState,
  postRemovingState,
  postEditingState,
  dataFetchingFromServerState,
});
