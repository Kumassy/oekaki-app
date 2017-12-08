import {
  REQUEST_HOME_POSTS,
  RECEIVE_HOME_POSTS,
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
    default:
      return state
  }
}
