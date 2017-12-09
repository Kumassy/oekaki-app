import {
  REQUEST_SIGN_IN,
  RECEIVE_SIGN_IN,
  FAILED_SIGN_IN,

  REQUEST_SIGN_UP,
  RECEIVE_SIGN_UP,
  FAILED_SIGN_UP,

  SWITCH_SIGNIN_MODE
} from '../actions/actionTypes';

export const initialState = {
  status: {
    mode: 'signin',
    error: {}
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
            error: {},
            isFetching: false,
            lastUpdated: receivedAt
          },
          user: user
        };
      }
    case FAILED_SIGN_IN:
      {
        const { error } = action;

        return {
          ...state,
          status: {
            ...state.status,
            error
          },
          user: {}
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
            error: {},
            isFetching: false,
            lastUpdated: receivedAt
          },
          user: user
        };
      }
    case FAILED_SIGN_UP:
      {
        const { error } = action;

        return {
          ...state,
          status: {
            ...state.status,
            error
          },
          user: {}
        };
      }
    case SWITCH_SIGNIN_MODE:
      {
        const { mode } = action;

        return {
          ...state,
          status: {
            ...state.status,
            mode
          }
        }
      }
    default:
      return state
  }
}
