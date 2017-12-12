import { combineReducers } from 'redux';
import { threadsReducer } from './threadsReducer';
import { homeReducer } from './homeReducer';
import { usersReducer } from './usersReducer';
import { userReducer } from './userReducer';
import { searchUsersReducer } from './searchUsersReducer';
import { postsReducer } from './postsReducer';
import { userInfoReducer } from './userInfoReducer';
import { settingsReducer } from './settingsReducer';
import { newPostReducer } from './newPostReducer';
import { newThreadReducer } from './newThreadReducer';
import { newCommentReducer } from './newCommentReducer';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  pageThreads: threadsReducer,
  pageHome: homeReducer,
  pageSettings: settingsReducer,
  pageUsers: usersReducer,
  pageUser: userReducer,
  pageSearchUsers: searchUsersReducer,
  pagePosts: postsReducer,
  userInfo: userInfoReducer,
  newPost: newPostReducer,
  newComment: newCommentReducer,
  newThread: newThreadReducer,
  router: routerReducer
})

export default rootReducer
