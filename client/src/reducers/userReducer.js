import {
  REQUEST_SIGN_IN,
  RECEIVE_SIGN_IN,
  FAILED_SIGN_IN,

  REQUEST_SIGN_UP,
  RECEIVE_SIGN_UP,
  FAILED_SIGN_UP,

  REQUEST_SIGN_OUT,
  RECEIVE_SIGN_OUT,
  FAILED_SIGN_OUT,

  REQUEST_LOGGED_IN_USER,
  RECEIVE_LOGGED_IN_USER,

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
            isFetching: false,
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
            isFetching: false,
            error
          },
          user: {}
        };
      }
    case REQUEST_SIGN_OUT:
      {
        return {
          ...state,
          status: {
            ...state.status,
            isFetching: true
          }
        }
      }
    case RECEIVE_SIGN_OUT:
      {
        const { message, receivedAt } = action;

        return {
          ...state,
          status: {
            ...state.status,
            message,
            error: {},
            isFetching: false,
            lastUpdated: receivedAt
          },
          user: {}
        };
      }
    case FAILED_SIGN_OUT:
      {
        const { error } = action;

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: false,
            error
          },
          user: {}
        };
      }
    case REQUEST_LOGGED_IN_USER:
      {

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: true
          }
        };
      }
    case RECEIVE_LOGGED_IN_USER:
      {
        const { user } = action;

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: false
          },
          user
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
