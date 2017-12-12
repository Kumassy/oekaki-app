import { combineReducers } from 'redux';
import { threadsReducer } from './threadsReducer';
import { homeReducer } from './homeReducer';
import { userReducer } from './userReducer';
import { settingsReducer } from './settingsReducer';
import { newPostReducer } from './newPostReducer';
import { newThreadReducer } from './newThreadReducer';
import { newCommentReducer } from './newCommentReducer';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  pageThreads: threadsReducer,
  pageHome: homeReducer,
  pageSettings: settingsReducer,
  userInfo: userReducer,
  newPost: newPostReducer,
  newComment: newCommentReducer,
  newThread: newThreadReducer,
  router: routerReducer
})

export default rootReducer
