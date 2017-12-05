import { combineReducers } from 'redux';
import {
  REQUEST_THREAD,
  RECEIVE_THREAD,
  SEND_NEW_COMMENT,
  RECEIVE_NEW_COMMENT
} from '../actions/index';


// change item: {} -> items: [] to store multiple thread
function thread(
  state = {
    isFetching: false,
    item: {}
  },
  action
) {

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
    case SEND_NEW_COMMENT:
      {
        const { comment } = action;
        // comment.isSending = true;

        // const newState = Object.assign({}, state, {});
        // newState.item.comments = state.item.comments.concat(comment);
        //
        // return newState;
        return {
          ...state,
          item: {
            ...state.item,
            comments: state.item.comments.concat({
              ...comment,
              isSending: true
            })
          }
        }
      }
    case RECEIVE_NEW_COMMENT:
      {
        const { comment } = action;
        // const newState = Object.assign({}, state, {});
        // newState.item.comments = state.item.comments.filter(c => c.isSending == null).concat(comment);
        //
        // return newState;
        return {
          ...state,
          item: {
            ...state.item,
            comments: state.item.comments.filter(c => c.isSending == null).concat(comment)
          }
        }
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  thread
})

export default rootReducer
