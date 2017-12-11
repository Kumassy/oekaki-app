import {
  SEND_NEW_THREAD,
  RECEIVE_NEW_THREAD,
  FAILED_NEW_THREAD,

  NEW_THREAD_INPUT_CHANGE_FILE,
  NEW_THREAD_INPUT_CHANGE_ANSWER,
  NEW_THREAD_INPUT_CLEAR,
  NEW_THREAD_CLOSE_DIALOG
} from '../actions/actionTypes';

export const initialState = {
  file: '',
  answer: '',
  isValid: false,
  isSending: false,
  error: {},
  shouldOpenDialog: false
};

export function newThreadReducer(state = initialState, action) {
  switch(action.type) {
    case NEW_THREAD_INPUT_CHANGE_FILE:
      {
        const { file } = action;
        const isValid = (file && file['name'] && state.answer !== '' && state.answer.match(/^[\u3040-\u309f\u30fc]+$/)) ? true : false;

        return {
          ...state,
          file,
          isValid
        }
      }
    case NEW_THREAD_INPUT_CHANGE_ANSWER:
      {
        const { answer } = action;
        const isValid = (state.file && state.file['name'] && answer !== '' && answer.match(/^[\u3040-\u309f\u30fc]+$/)) ? true : false;

        return {
          ...state,
          answer,
          isValid
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

        const { file, answer } = state;
        const isValid = (file && file['name'] && answer !== '' && answer.match(/^[\u3040-\u309f\u30fc]+$/)) ? true : false;


        return {
          ...state,
          isValid,
          isSending: false,
          error,
          shouldOpenDialog: true
        }
      }
    default:
      return state
  }
}
