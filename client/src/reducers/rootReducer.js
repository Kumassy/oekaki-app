import { combineReducers } from 'redux';
import { threadsReducer } from './threadsReducer';
import { homeReducer } from './homeReducer';

const rootReducer = combineReducers({
  pageThreads: threadsReducer,
  pageHome: homeReducer
})

export default rootReducer
