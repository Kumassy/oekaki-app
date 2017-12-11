import {
  REQUEST_HOME_POSTS,
  RECEIVE_HOME_POSTS,

  SEND_NEW_THREAD,
  RECEIVE_NEW_THREAD,
  FAILED_NEW_THREAD,
} from '../actions/actionTypes';

export const initialState = {
  posts: []
};

export function homeReducer(state = initialState, action) {
  switch(action.type) {
    case REQUEST_HOME_POSTS:
      {
        return {
          ...state,
          status: {
            ...state.status,
            isFetching: true
          }
        }
      }
    case RECEIVE_HOME_POSTS:
      {
        const { posts, receivedAt } = action;

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: false,
            lastUpdated: receivedAt
          },
          posts: posts
        };
      }
    case SEND_NEW_THREAD:
      {
        const { post } = action;
        return {
          ...state,
          posts: [{
            ...post,
            isSending: true
          }].concat(state.posts)
        }
      }
    case RECEIVE_NEW_THREAD:
      {
        const { post } = action;
        return {
          ...state,
          posts: [post].concat(state.posts.filter(p => p.isSending == null))
        }
      }
    case FAILED_NEW_THREAD:
      {
        return {
          ...state,
          posts: state.posts.filter(p => p.isSending == null)
        }
      }
      
    default:
      return state
  }
}
