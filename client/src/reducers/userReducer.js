import {
  REQUEST_USER_POSTS,
  RECEIVE_USER_POSTS,
} from '../actions/actionTypes';

export const initialState = {
  user: {},
  posts: [],
  status: {
    isFetching: false,
    lastUpdated: null
  }
};

export function userReducer(state = initialState, action) {
  switch(action.type) {
    case REQUEST_USER_POSTS:
      {
        return {
          ...state,
          status: {
            ...state.status,
            isFetching: true
          }
        }
      }
    case RECEIVE_USER_POSTS:
      {
        const { user, posts, receivedAt } = action;

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: false,
            lastUpdated: receivedAt
          },
          user,
          posts
        };
      }

    default:
      return state
  }
}
