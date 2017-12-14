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

  LOGIN_INPUT_CHANGE,
  LOGIN_INPUT_CLEAR,

  SWITCH_SIGNIN_MODE,

  REQUEST_UPDATE_PASSWORD,
  RECEIVE_UPDATE_PASSWORD,
  FAILED_UPDATE_PASSWORD,

  REQUEST_UPDATE_AVATAR,
  RECEIVE_UPDATE_AVATAR,
  FAILED_UPDATE_AVATAR
} from '../actions/actionTypes';

export const initialState = {
  status: {
    mode: 'signin',
    error: {}
  },
  user: {
  },
  loginInput: {
    username: '',
    password: '',
    isValid: false,
    invalidReasonUsername: '',
    invalidReasonPassword: '',
  }
};


function validate(username, password) {
  const isValid = (username !== '' && username.match(/^\w+$/) && username.length <= 20 &&
    password !== '' && password.match(/^\w+$/) && password.length <= 20) ? true : false;

  let invalidReasonUsername = '';
  if (username !== '' && username.match(/^\w+$/) == null) {
    invalidReasonUsername = '使用できない文字が含まれています';
  } else if (username !== '' && username.length > 20) {
    invalidReasonUsername = '文字列が長すぎます';
  }

  let invalidReasonPassword = '';
  if (password !== '' && password.match(/^\w+$/) == null) {
    invalidReasonPassword = '使用できない文字が含まれています';
  } else if (password !== '' && password.length > 20) {
    invalidReasonPassword = '文字列が長すぎます';
  }

  return {
    isValid,
    invalidReasonUsername,
    invalidReasonPassword
  }
}


export function userInfoReducer(state = initialState, action) {
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
          }
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
    case LOGIN_INPUT_CHANGE:
      {
        const { newInput } = action;

        const credentials = {
          ...state.loginInput,
          ...newInput
        };
        const { isValid, invalidReasonUsername, invalidReasonPassword } = validate(credentials.username, credentials.password);

        return {
          ...state,
          loginInput: {
            ...credentials,
            isValid,
            invalidReasonUsername,
            invalidReasonPassword
          }
        }
      }
    case LOGIN_INPUT_CLEAR:
      {
        return {
          ...state,
          loginInput: {
            username: '',
            password: '',
            isValid: false,
            invalidReasonUsername: '',
            invalidReasonPassword: ''
          }
        }
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
    case REQUEST_UPDATE_PASSWORD:
      return {
        ...state,
        status: {
          ...state.status,
          isFetching: true
        }
      };
    case RECEIVE_UPDATE_PASSWORD:
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
    case FAILED_UPDATE_PASSWORD:
      {
        const { error } = action;

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: false,
            error
          }
        };
      }
    case REQUEST_UPDATE_AVATAR:
      return {
        ...state,
        status: {
          ...state.status,
          isFetching: true
        }
      };
    case RECEIVE_UPDATE_AVATAR:
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
    case FAILED_UPDATE_AVATAR:
      {
        const { error } = action;

        return {
          ...state,
          status: {
            ...state.status,
            isFetching: false,
            error
          }
        };
      }
    default:
      return state
  }
}
