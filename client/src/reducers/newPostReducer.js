import {
  NEW_POST_INPUT_CHANGE_FILE,
  NEW_POST_INPUT_CHANGE_ANSWER,
  NEW_POST_INPUT_CLEAR
} from '../actions/actionTypes';

export const initialState = {
  file: null,
  answer: '',
  isValid: false
};

export function newPostReducer(state = initialState, action) {
  switch(action.type) {
    case NEW_POST_INPUT_CHANGE_FILE:
      {
        const { file } = action;
        const isValid = (file && file['name'] && state.answer !== '' && state.answer.match(/^[\u3040-\u309f\u30fc]+$/)) ? true : false;

        return {
          ...state,
          file,
          isValid
        }
      }
    case NEW_POST_INPUT_CHANGE_ANSWER:
      {
        const { answer } = action;
        const isValid = (state.file && state.file['name'] && answer !== '' && answer.match(/^[\u3040-\u309f\u30fc]+$/)) ? true : false;

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
          file: null,
          answer: '',
          isValid: false
        }
      }
    default:
      return state
  }
}
