import {
  SEND_NEW_POST,
  RECEIVE_NEW_POST,
  FAILED_NEW_POST,

  NEW_POST_INPUT_CHANGE_FILE,
  NEW_POST_INPUT_CHANGE_ANSWER,
  NEW_POST_INPUT_CLEAR,
  NEW_POST_CLOSE_DIALOG,

  SWITCH_NEW_POST_MODE,
} from '../actions/actionTypes';

export const initialState = {
  file: '',
  answer: '',
  mode: 'file',
  isValid: false,
  sendingPost: {},
  isSending: false,
  error: {},
  shouldOpenDialog: false
};

export function newPostReducer(state = initialState, action) {
  switch(action.type) {
    case NEW_POST_INPUT_CHANGE_FILE:
      {
        const { file } = action;
        const { answer, mode } = state;
        const isValidFile = (file && file['name'] && answer !== '' && answer.match(/^[\u3040-\u309f]+$/)) ? true : false;
        const isValidCanvas = (answer !== '' && answer.match(/^[\u3040-\u309f]+$/)) ? true : false;
        const isValid = ((mode === 'file' && isValidFile) || (mode === 'canvas' && isValidCanvas)) ? true : false;

        return {
          ...state,
          file,
          isValid
        }
      }
    case NEW_POST_INPUT_CHANGE_ANSWER:
      {
        const { answer } = action;
        const { file, mode } = state;
        const isValidFile = (file && file['name'] && answer !== '' && answer.match(/^[\u3040-\u309f]+$/)) ? true : false;
        const isValidCanvas = (answer !== '' && answer.match(/^[\u3040-\u309f]+$/)) ? true : false;
        const isValid = ((mode === 'file' && isValidFile) || (mode === 'canvas' && isValidCanvas)) ? true : false;

        return {
          ...state,
          answer,
          isValid
        }
      }
    case NEW_POST_INPUT_CLEAR:
      {
        return {
          ...state,
          file: '',
          answer: '',
          isValid: false
        }
      }
    case NEW_POST_CLOSE_DIALOG:
      {
        return {
          ...state,
          shouldOpenDialog: false
        }
      }
    case SWITCH_NEW_POST_MODE:
      {
        const { mode } = action;

        return {
          ...state,
          mode
        }
      }
    case SEND_NEW_POST:
      {
        const { post } = action;

        return {
          ...state,
          sendingPost: post,
          isSending: true,
          error: {},
          shouldOpenDialog: false
        }
      }
    case RECEIVE_NEW_POST:
      {
        const { post } = action;

        return {
          ...state,
          sendingPost: {},
          isSending: false,
          error: {},
          shouldOpenDialog: false
        }
      }
    case FAILED_NEW_POST:
      {
        const { error } = action;

        const { file, answer } = state;
        const isValid = (file && file['name'] && answer !== '' && answer.match(/^[\u3040-\u309f]+$/)) ? true : false;


        return {
          ...state,
          isValid,
          sendingPost: {},
          isSending: false,
          error,
          shouldOpenDialog: true
        }
      }
    default:
      return state
  }
}
