import { combineReducers } from 'redux';
import { threadsReducer } from './threadsReducer';
import { homeReducer } from './homeReducer';
import { userReducer } from './userReducer';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  pageThreads: threadsReducer,
  pageHome: homeReducer,
  userInfo: userReducer,
  router: routerReducer
})

export default rootReducer
