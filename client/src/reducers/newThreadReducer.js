import {
  SEND_NEW_THREAD,
  RECEIVE_NEW_THREAD,
  FAILED_NEW_THREAD,

  NEW_THREAD_INPUT_CHANGE_FILE,
  NEW_THREAD_INPUT_CHANGE_ANSWER,
  NEW_THREAD_INPUT_CLEAR,
  NEW_THREAD_CLOSE_DIALOG,

  SWITCH_NEW_THREAD_MODE,
} from '../actions/actionTypes';

export const initialState = {
  file: '',
  answer: '',
  mode: 'file',
  isValid: false,
  invalidReason: '',
  isSending: false,
  error: {},
  shouldOpenDialog: false
};


function validate(file, answer, mode) {
  const isValidFile = (file && file['name'] && answer !== '' && answer.match(/^[\u3040-\u309f]+$/) && answer.length <= 30) ? true : false;
  const isValidCanvas = (answer !== '' && answer.match(/^[\u3040-\u309f]+$/) && answer.length <= 30) ? true : false;
  const isValid = ((mode === 'file' && isValidFile) || (mode === 'canvas' && isValidCanvas)) ? true : false;

  let invalidReason = '';
  if (answer !== '' && answer.match(/^[\u3040-\u309f]+$/) == null) {
    invalidReason = '使用できない文字が含まれています';
  } else if (answer !== '' && answer.length > 30) {
    invalidReason = '文字列が長すぎます';
  }

  return {
    isValid,
    invalidReason
  }
}

export function newThreadReducer(state = initialState, action) {
  switch(action.type) {
    case NEW_THREAD_INPUT_CHANGE_FILE:
      {
        const { file } = action;
        const { answer, mode } = state;
        const { isValid, invalidReason } = validate(file, answer, mode);

        return {
          ...state,
          file,
          isValid,
          invalidReason
        }
      }
    case NEW_THREAD_INPUT_CHANGE_ANSWER:
      {
        const { answer } = action;
        const { file, mode } = state;
        const { isValid, invalidReason } = validate(file, answer, mode);

        return {
          ...state,
          answer,
          isValid,
          invalidReason
        }
      }
    case NEW_THREAD_INPUT_CLEAR:
      {
        return {
          ...state,
          file: '',
          answer: '',
          isValid: false
        }
      }
    case NEW_THREAD_CLOSE_DIALOG:
      {
        return {
          ...state,
          shouldOpenDialog: false
        }
      }
    case SWITCH_NEW_THREAD_MODE:
      {
        const { mode } = action;
        const { answer, file } = state;
        const { isValid, invalidReason } = validate(file, answer, mode);

        return {
          ...state,
          mode,
          isValid,
          invalidReason
        }
      }
    case SEND_NEW_THREAD:
      {
        const { post } = action;

        return {
          ...state,
          isSending: true,
          error: {},
          shouldOpenDialog: false
        }
      }
    case RECEIVE_NEW_THREAD:
      {
        const { post } = action;

        return {
          ...state,
          isSending: false,
          error: {},
          shouldOpenDialog: false
        }
      }
    case FAILED_NEW_THREAD:
      {
        const { error } = action;
        const { file, answer, mode } = state;
        const { isValid, invalidReason } = validate(file, answer, mode);


        return {
          ...state,
          isValid,
          invalidReason,
          isSending: false,
          error,
          shouldOpenDialog: true
        }
      }
    default:
      return state
  }
}
