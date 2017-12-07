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

function pageThreads(state = initialState, action) {
  switch(action.type) {
    case REQUEST_THREAD:
      {
        const { threadId } = action;
        const threads = state.threads.some(threadContainer => {
          return threadContainer.thread.id === threadId
        }) ? state.threads : state.threads.concat({
          status: {

          },
          thread: {
            id: threadId
          }
        });
        return {
          ...state,
          threads: threads.map(threadContainer => {
            if (threadContainer.thread.id !== threadId) {
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
      }
    case RECEIVE_THREAD:
      {
        const { thread, receivedAt } = action;

        const threads = state.threads.map(threadContainer => {
          if (threadContainer.thread.id !== thread.id) {
            return threadContainer;
          } else {
            return {
              ...threadContainer,
              status: {
                ...threadContainer.status,
                isFetching: false,
                lastUpdated: receivedAt
              },
              thread: thread
            }
          }
        });

        return {
          ...state,
          threads
        }
      }
    case SEND_NEW_COMMENT:
      {
        const { comment } = action;
        const threads = state.threads.map(threadContainer => {
          if (threadContainer.thread.id !== comment.thread_id) {
            return threadContainer;
          } else {
            return {
              ...threadContainer,
              thread: {
                ...threadContainer.thread,
                comments: threadContainer.thread.comments.concat({
                  ...comment,
                  isSending: true
                })
              }
            }
          }
        });
        return {
          ...state,
          threads
        }
      }
    case RECEIVE_NEW_COMMENT:
      {
        const { comment } = action;
        const threads = state.threads.map(threadContainer => {
          if (threadContainer.thread.id !== comment.thread_id) {
            return threadContainer;
          } else {
            return {
              ...threadContainer,
              thread: {
                ...threadContainer.thread,
                comments: threadContainer.thread.comments.filter(c => c.isSending == null).concat(comment)
              }
            }
          }
        });

        return {
          ...state,
          threads
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
