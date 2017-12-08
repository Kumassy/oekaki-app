// import {
//   REQUEST_HOME_POSTS,
//   RECEIVE_HOME_POSTS,
// } from '../actions/actionTypes';

export const initialState = {
  status: {
    login: true
  },
  user: {
    id: 1,
    username: 'pandaman',
    avatar: 'images/pandaman.jpg'
  }
};



export function userReducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state
  }
}
