import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

const currentPage = handleActions({
  [actions.fetchDataFromServerSuccess](state, { payload: { currentPage } }) {
    return currentPage;
  },
  [actions.selectPage](state, { payload: { page } }) {
    return page;
  },
}, 1);

const posts = handleActions({
  [actions.fetchDataFromServerSuccess](state, { payload: { posts } }) {
    return {
      byId: _.keyBy(posts, '_id'),
      allIds: posts.map((el) => el._id),
    };
  },
  [actions.addPostSuccess](state, { payload: { post } }) {
    const { byId, allIds } = state;
    const { _id, title, content, preview, image, date } = post;
    return {
      byId: {...byId, [_id]: { _id, title, content, preview, image, date } },
      allIds: [...allIds, _id],
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
  adminAuthentificationState,
  postRemovingState,
  dataFetchingFromServerState,
});
