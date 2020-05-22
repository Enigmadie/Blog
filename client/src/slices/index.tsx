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
  fetchAdminData,
  fetchCategoryData,
} from './fetchingState';

import isAdmin, { isAdminActions, authenticationAdmin } from './isAdmin';
import currentPage, { currentPageActions } from './currentPage';
import activePost, { activePostActions } from './activePost';

const asyncActions = {
  addPost,
  editPost,
  removePost,
  authenticationAdmin,
  fetchPostsData,
  fetchActivePostData,
  fetchAdminData,
  fetchCategoryData,
};

const actions = {
  ...postsActions,
  ...isAdminActions,
  ...currentPageActions,
  ...activePostActions,
  ...fetchingStateActions,
};

const rootReducer = combineReducers({
  posts,
  isAdmin,
  currentPage,
  activePost,
  fetchingState,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

export {
  actions,
  asyncActions,
};
