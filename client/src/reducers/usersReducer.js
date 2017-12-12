import {
  REQUEST_USERS,
  RECEIVE_USERS,
} from '../actions/actionTypes';

export const initialState = {
  users: [],
  status: {
    isFetching: false,
    lastUpdated: null
  }
};

export function usersReducer(state = initialState, action) {
  switch(action.type) {
    case REQUEST_USERS:
      {
        return {
          ...state,
          status: {
            ...state.status,
            isFetching: true
          }
        }
      }
    case RECEIVE_USERS:
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
      
    default:
      return state
  }
}
