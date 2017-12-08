import {
  REQUEST_SIGN_IN,
  RECEIVE_SIGN_IN,
  REQUEST_SIGN_UP,
  RECEIVE_SIGN_UP
} from '../actions/actionTypes';

export const initialState = {
  status: {
  },
  user: {
  }
};

export function userReducer(state = initialState, action) {
  switch(action.type) {
    case REQUEST_SIGN_IN:
      {
        return {
          ...state,
          status: {
            ...state.status,
            isFetching: true
          }
        }
      }
    case RECEIVE_SIGN_IN:
      {
        const { user, receivedAt } = action;

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: false,
            lastUpdated: receivedAt
          },
          user: user
        };
      }
    case REQUEST_SIGN_UP:
      {
        return {
          ...state,
          status: {
            ...state.status,
            isFetching: true
          }
        }
      }
    case RECEIVE_SIGN_UP:
      {
        const { user, receivedAt } = action;

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: false,
            lastUpdated: receivedAt
          },
          user: user
        };
      }
    default:
      return state
  }
}
