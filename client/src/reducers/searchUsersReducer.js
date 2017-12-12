import {
  REQUEST_SEARCH_USERS,
  RECEIVE_SEARCH_USERS,
  SEARCH_USERS_INPUT_CHANGE
} from '../actions/actionTypes';

export const initialState = {
  users: [],
  status: {
    isFetching: false,
    lastUpdated: null
  },
  keyword: ''
};

export function searchUsersReducer(state = initialState, action) {
  switch(action.type) {
    case REQUEST_SEARCH_USERS:
      {
        return {
          ...state,
          status: {
            ...state.status,
            isFetching: true
          }
        }
      }
    case RECEIVE_SEARCH_USERS:
      {
        const { users, receivedAt } = action;

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: false,
            lastUpdated: receivedAt
          },
          users
        };
      }
    case SEARCH_USERS_INPUT_CHANGE:
      {
        const { keyword } = action;

        return {
          ...state,
          keyword
        }
      }

    default:
      return state
  }
}
