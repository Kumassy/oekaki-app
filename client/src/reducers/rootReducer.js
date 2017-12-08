import { combineReducers } from 'redux';
import { threadsReducer } from './threadsReducer';
import { homeReducer } from './homeReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  pageThreads: threadsReducer,
  pageHome: homeReducer,
  userInfo: userReducer
})

export default rootReducer
