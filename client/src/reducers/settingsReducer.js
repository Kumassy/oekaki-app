import {
  SETTINGS_INPUT_CHANGE_CURRENT_PASSWORD,
  SETTINGS_INPUT_CHANGE_NEW_PASSWORD,
  SETTINGS_INPUT_CHANGE_NEW_PASSWORD_CONFIRM,
  SETTINGS_INPUT_CLEAR_PASSWORD,
  SETTINGS_CLOSE_DIALOG_PASSWORD,
  SETTINGS_INPUT_CHANGE_FILE,
  SETTINGS_INPUT_CLEAR_FILE,
  SETTINGS_CLOSE_DIALOG_FILE,

  REQUEST_UPDATE_PASSWORD,
  RECEIVE_UPDATE_PASSWORD,
  FAILED_UPDATE_PASSWORD,

  REQUEST_UPDATE_AVATAR,
  RECEIVE_UPDATE_AVATAR,
  FAILED_UPDATE_AVATAR
} from '../actions/actionTypes';

export const initialState = {
  password: {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
    isValid: false,
    isPasswordMatch: true,
    isSending: false,
    error: {},
    shouldOpenDialog: false
  },
  avatar: {
    file: '',
    isValid: false,
    isSending: false,
    error: {},
    shouldOpenDialog: false
  }
};

export function settingsReducer(state = initialState, action) {
  switch(action.type) {
    case SETTINGS_INPUT_CHANGE_CURRENT_PASSWORD:
      {
        const { currentPassword } = action;
        const { newPassword, newPasswordConfirm } = state.password;

        const isPasswordMatch = ((newPassword !== '' && newPasswordConfirm !== '' && newPassword === newPasswordConfirm) ||
          (newPassword === '' && newPasswordConfirm === '') ||
          (newPassword === '' && newPasswordConfirm !== '') ||
          (newPassword !== '' && newPasswordConfirm === '')) ? true: false;

        const isValid = (currentPassword !== '' && newPassword !== '' &&
          newPasswordConfirm !== '' &&  newPassword === newPasswordConfirm) ? true : false;


        return {
          ...state,
          password: {
            ...state.password,
            currentPassword,
            isValid,
            isPasswordMatch
          }
        }
      }
    case SETTINGS_INPUT_CHANGE_NEW_PASSWORD:
      {
        const { newPassword } = action;
        const { currentPassword, newPasswordConfirm } = state.password;

        const isPasswordMatch = ((newPassword !== '' && newPasswordConfirm !== '' && newPassword === newPasswordConfirm) ||
          (newPassword === '' && newPasswordConfirm === '') ||
          (newPassword === '' && newPasswordConfirm !== '') ||
          (newPassword !== '' && newPasswordConfirm === '')) ? true: false;

        const isValid = (currentPassword !== '' && newPassword !== '' &&
          newPasswordConfirm !== '' &&  newPassword === newPasswordConfirm) ? true : false;


        return {
          ...state,
          password: {
            ...state.password,
            newPassword,
            isValid,
            isPasswordMatch
          }
        }
      }
    case SETTINGS_INPUT_CHANGE_NEW_PASSWORD_CONFIRM:
      {
        const { newPasswordConfirm } = action;
        const { currentPassword, newPassword } = state.password;

        const isPasswordMatch = ((newPassword !== '' && newPasswordConfirm !== '' && newPassword === newPasswordConfirm) ||
          (newPassword === '' && newPasswordConfirm === '') ||
          (newPassword === '' && newPasswordConfirm !== '') ||
          (newPassword !== '' && newPasswordConfirm === '')) ? true: false;

        const isValid = (currentPassword !== '' && newPassword !== '' &&
          newPasswordConfirm !== '' &&  newPassword === newPasswordConfirm) ? true : false;


        return {
          ...state,
          password: {
            ...state.password,
            newPasswordConfirm,
            isValid,
            isPasswordMatch
          }
        }
      }
    case SETTINGS_INPUT_CLEAR_PASSWORD:
      {
        return {
          ...state,
          password: {
            ...state.password,
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
            isValid: false,
            isPasswordMatch: true,
          }
        }

      }
    case SETTINGS_CLOSE_DIALOG_PASSWORD:
      {
        return {
          ...state,
          password: {
            ...state.password,
            shouldOpenDialog: false
          }

        }
      }
    case SETTINGS_INPUT_CHANGE_FILE:
      {
        const { file } = action;
        const isValid = (file && file['name']) ? true : false;

        return {
          ...state,
          avatar: {
            ...state.avatar,
            file,
            isValid
          }
        }
      }
    case SETTINGS_INPUT_CLEAR_FILE:
      {
        return {
          ...state,
          avatar: {
            ...state.avatar,
            file: '',
            isValid: false
          }
        }
      }
    case SETTINGS_CLOSE_DIALOG_FILE:
      {
        return {
          ...state,
          avatar: {
            ...state.avatar,
            shouldOpenDialog: false
          }
        }
      }


    case REQUEST_UPDATE_PASSWORD:
      return {
        ...state,
        password: {
          ...state.password,
          isSending: true,
          error: {},
          shouldOpenDialog: false
        }
      }
    case RECEIVE_UPDATE_PASSWORD:
      return {
        ...state,
        password: {
          ...state.password,
          isSending: false,
          error: {},
          shouldOpenDialog: false
        }
      }
    case FAILED_UPDATE_PASSWORD:
      {
        const { error } = action;
        const { currentPassword, newPassword, newPasswordConfirm } = state.password;

        const isPasswordMatch = ((newPassword !== '' && newPasswordConfirm !== '' && newPassword === newPasswordConfirm) ||
          (newPassword === '' && newPasswordConfirm === '') ||
          (newPassword === '' && newPasswordConfirm !== '') ||
          (newPassword !== '' && newPasswordConfirm === '')) ? true: false;

        const isValid = (currentPassword !== '' && newPassword !== '' &&
          newPasswordConfirm !== '' &&  newPassword === newPasswordConfirm) ? true : false;

        return {
          ...state,
          password: {
            ...state.password,
            isValid,
            isPasswordMatch,
            isSending: false,
            error,
            shouldOpenDialog: true
          }
        }
      }

    case REQUEST_UPDATE_AVATAR:
      return {
        ...state,
        avatar: {
          ...state.avatar,
          isSending: true,
          error: {},
          shouldOpenDialog: false
        }
      }
    case RECEIVE_UPDATE_AVATAR:
      return {
        ...state,
        avatar: {
          ...state.avatar,
          isSending: false,
          error: {},
          shouldOpenDialog: false
        }
      }
    case FAILED_UPDATE_AVATAR:
      {
        const { error } = action;
        const { file } = state.avatar;
        const isValid = (file && file['name']) ? true : false;


        return {
          ...state,
          avatar: {
            ...state.avatar,
            isValid,
            isSending: false,
            error,
            shouldOpenDialog: true
          }
        }
      }
    default:
      return state
  }
}
