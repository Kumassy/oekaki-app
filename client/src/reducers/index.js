import { combineReducers } from 'redux';
import {
  REQUEST_THREAD,
  RECEIVE_THREAD,
  SEND_NEW_COMMENT,
  RECEIVE_NEW_COMMENT
} from '../actions/index';

export const initialState = {
  threads: []
};

// change item: {} -> items: [] to store multiple thread
function pageThreads(state = initialState, action) {
  switch(action.type) {
    case REQUEST_THREAD:
      // return Object.assign({}, state, {
      //   isFetching: true
      // })
      const threads = state.threads.some(threadContainer => {
        return threadContainer.thread.id === action.threadId
      }) ? state.threads : state.threads.concat({
        status: {

        },
        thread: {
          id: action.threadId
        }
      });
      return {
        ...state,
        threads: threads.map(threadContainer => {
          if (threadContainer.thread.id !== action.threadId) {
            return threadContainer;
          } else {
            return {
              ...threadContainer,
              status: {
                ...threadContainer.status,
                isFetching: true
              }
            }
          }
        })
      }
    case RECEIVE_THREAD:
      // return Object.assign({}, state, {
      //   isFetching: false,
      //   item: action.thread,
      //   lastUpdated: action.receivedAt
      // })
      return {
        ...state,
        pageThreads: {
          ...state.pageThreads,
          threads: state.pageThreads.threads.map(threadContainer => {
            if (threadContainer.thread.id === action.thread_id) {
              return threadContainer;
            } else {
              return {
                ...threadContainer,
                status: {
                  ...threadContainer.status,
                  isFetching: false,
                  lastUpdated: action.receivedAt
                },
                thread: action.thread
              }
            }
          })
        }
      }
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
  pageThreads
})

export default rootReducer
