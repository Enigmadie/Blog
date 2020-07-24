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
  fetchAdminData,
  fetchCategoryData,
} from './fetchingState';

import isAdmin, { isAdminActions, authenticationAdmin } from './isAdmin';
import activePost, {
  activePostActions,
  addComment,
  editComment,
  removeComment,
} from './activePost';

const asyncActions = {
  addPost,
  editPost,
  removePost,
  addComment,
  editComment,
  removeComment,
  authenticationAdmin,
  fetchPostsData,
  fetchActivePostData,
  fetchAdminData,
  fetchCategoryData,
  fetchActivePostComments,
};

const actions = {
  ...postsActions,
  ...isAdminActions,
  ...activePostActions,
  ...fetchingStateActions,
};

const rootReducer = combineReducers({
  posts,
  isAdmin,
  activePost,
  fetchingState,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

export {
  actions,
  asyncActions,
};
