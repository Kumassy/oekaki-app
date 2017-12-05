import { combineReducers } from 'redux';
import {
  REQUEST_THREAD,
  RECEIVE_THREAD
} from '../actions/index';


// change item: {} -> items: [] to store multiple thread
function thread(
  state = {
    isFetching: false,
    item: {}
  },
  action
) {
  console.table(state);
  console.table(action);

  switch(action.type) {
    case REQUEST_THREAD:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_THREAD:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.thread,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  thread
})

export default rootReducer
