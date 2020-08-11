import { combineReducers } from 'redux';

import posts, {
  postsActions,
  addPost,
  editPost,
  removePost,
} from './posts';

import fetchingState, {
  fetchingStateActions,
  fetchPostsData,
  fetchActivePostData,
  fetchActivePostComments,
  fetchCategoryData,
} from './fetchingState';

import profile, {
  profileActions,
  authenticationProfile,
  registrationProfile,
  checkAuthToken,
} from './profile';

import activePost, {
  activePostActions,
  addComment,
  editComment,
  removeComment,
} from './activePost';

import ui, { uiActions } from './ui';

const asyncActions = {
  addPost,
  editPost,
  removePost,
  addComment,
  editComment,
  removeComment,
  authenticationProfile,
  registrationProfile,
  checkAuthToken,
  fetchPostsData,
  fetchActivePostData,
  fetchCategoryData,
  fetchActivePostComments,
};

const actions = {
  ...postsActions,
  ...profileActions,
  ...activePostActions,
  ...fetchingStateActions,
  ...uiActions,
};

const rootReducer = combineReducers({
  posts,
  profile,
  activePost,
  fetchingState,
  ui,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

export {
  actions,
  asyncActions,
};
