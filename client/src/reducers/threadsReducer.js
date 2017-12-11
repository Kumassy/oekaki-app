import {
  REQUEST_THREAD,
  RECEIVE_THREAD,

  SEND_NEW_COMMENT,
  RECEIVE_NEW_COMMENT,
  FAILED_NEW_COMMENT,

  SEND_NEW_POST,
  RECEIVE_NEW_POST,
  FAILED_NEW_POST
} from '../actions/actionTypes';

export const initialState = {
  threads: []
};

export function threadsReducer(state = initialState, action) {
  switch(action.type) {
    case REQUEST_THREAD:
      {
        const { threadId } = action;
        const threads = state.threads.some(threadContainer => {
          return threadContainer.thread.id === threadId
        }) ? state.threads : state.threads.concat({
          status: {
            error: {}
          },
          thread: {
            id: threadId,
            posts: [],
            comments: []
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
        };
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
    case FAILED_NEW_COMMENT:
      {
        const { error, threadId } = action;
        const threads = state.threads.map(threadContainer => {
          if (threadContainer.thread.id !== threadId) {
            return threadContainer;
          } else {
            return {
              ...threadContainer,
              status: {
                ...threadContainer.status,
                error
              },
              thread: {
                ...threadContainer.thread,
                comments: threadContainer.thread.comments.filter(c => c.isSending == null)
              }
            }
          }
        });

        return {
          ...state,
          threads
        }
      }
    case SEND_NEW_POST:
      {
        const { post } = action;
        const threads = state.threads.map(threadContainer => {
          if (threadContainer.thread.id !== post.thread_id) {
            return threadContainer;
          } else {
            return {
              ...threadContainer,
              thread: {
                ...threadContainer.thread,
                posts: threadContainer.thread.posts.concat({
                  ...post,
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
    case RECEIVE_NEW_POST:
      {
        const { post } = action;
        const threads = state.threads.map(threadContainer => {
          if (threadContainer.thread.id !== post.thread_id) {
            return threadContainer;
          } else {
            return {
              ...threadContainer,
              thread: {
                ...threadContainer.thread,
                posts: threadContainer.thread.posts.filter(p => p.isSending == null).concat(post)
              }
            }
          }
        });

        return {
          ...state,
          threads
        }
      }
    case FAILED_NEW_POST:
      {
        const { error, threadId } = action;
        const threads = state.threads.map(threadContainer => {
          if (threadContainer.thread.id !== threadId) {
            return threadContainer;
          } else {
            return {
              ...threadContainer,
              status: {
                ...threadContainer.status,
                error
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
