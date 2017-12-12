import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from '../actions/actionTypes';

export const initialState = {
  posts: [],
  status: {
    isFetching: false,
    lastUpdated: null
  }
};

export function postsReducer(state = initialState, action) {
  switch(action.type) {
    case REQUEST_POSTS:
      {
        return {
          ...state,
          status: {
            ...state.status,
            isFetching: true
          }
        }
      }
    case RECEIVE_POSTS:
      {
        const { posts, receivedAt } = action;

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: false,
            lastUpdated: receivedAt
          },
          posts
        };
      }

    default:
      return state
  }
}
