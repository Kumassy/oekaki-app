import {
  SEND_NEW_COMMENT,
  RECEIVE_NEW_COMMENT,
  FAILED_NEW_COMMENT,

  NEW_COMMENT_INPUT_CHANGE_COMMENT,
  NEW_COMMENT_INPUT_CLEAR,
  NEW_COMMENT_CLOSE_DIALOG
} from '../actions/actionTypes';

export const initialState = {
  comment: '',
  isValid: false,
  invalidReason: '',
  sendingComment: {},
  isSending: false,
  error: {},
  shouldOpenDialog: false
};

function validate(comment) {
  const isValid = (comment !== '' && comment.length <= 200) ? true : false;

  let invalidReason = '';
  if (comment !== '' && comment.length > 200) {
    invalidReason = '文字列が長すぎます';
  }

  return {
    isValid,
    invalidReason
  }
}

export function newCommentReducer(state = initialState, action) {
  switch(action.type) {
    case NEW_COMMENT_INPUT_CHANGE_COMMENT:
      {
        const { comment } = action;
        const { isValid, invalidReason } = validate(comment);

        return {
          ...state,
          comment,
          isValid,
          invalidReason
        }
      }
    case NEW_COMMENT_INPUT_CLEAR:
      {
        return {
          ...state,
          comment: '',
          isValid: false
        }
      }
    case NEW_COMMENT_CLOSE_DIALOG:
      {
        return {
          ...state,
          shouldOpenDialog: false
        }
      }
    case SEND_NEW_COMMENT:
      {
        const { comment } = action;

        return {
          ...state,
          sendingComment: comment,
          isSending: true,
          error: {},
          shouldOpenDialog: false
        }
      }
    case RECEIVE_NEW_COMMENT:
      {
        const { comment } = action;

        return {
          ...state,
          sendingComment: {},
          isSending: false,
          error: {},
          shouldOpenDialog: false
        }
      }
    case FAILED_NEW_COMMENT:
      {
        const { error } = action;

        const comment = state.sendingComment.comment;
        const { isValid, invalidReason } = validate(comment);

        return {
          ...state,
          comment,
          isValid,
          invalidReason,
          sendingComment: {},
          isSending: false,
          error,
          shouldOpenDialog: true
        }
      }
    default:
      return state
  }
}
