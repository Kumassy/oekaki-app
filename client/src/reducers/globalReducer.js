import {
  GLOBAL_SERVER_ERROR
} from '../actions/actionTypes';

export const initialState = {
  shouldOpenDialog: false
};

export function globalReducer(state = initialState, action) {
  switch(action.type) {
    case GLOBAL_SERVER_ERROR:
      {
        return {
          shouldOpenDialog: true
        }
      }
    default:
      return state
  }
}
