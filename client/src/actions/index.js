'use strict';

import {
  getThread,
  newComment,
  newPost,
  getHomePosts,
  doSignIn,
  doSignUp,
  doSignOut,
  getLoggedInUser
} from '../clientHttp';
import { getBase64 } from '../utils';

// Action Creators
// See: https://redux.js.org/docs/basics/ExampleTodoList.html
import {
  REQUEST_HOME_POSTS,
  RECEIVE_HOME_POSTS,

  REQUEST_THREAD,
  RECEIVE_THREAD,

  SEND_NEW_COMMENT,
  RECEIVE_NEW_COMMENT,
  FAILED_NEW_COMMENT,

  SEND_NEW_POST,
  RECEIVE_NEW_POST,
  FAILED_NEW_POST,

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
} from './actionTypes'

function requestThread(id) {
  return {
    type: REQUEST_THREAD,
    threadId: id
  }
}

function receiveThread(thread) {
  return {
    type: RECEIVE_THREAD,
    thread: thread,
    receivedAt: Date.now()
  }
}

function fetchThread(id) {
  return dispatch => {
    dispatch(requestThread(id));
    return getThread(id)
      .then(thread => dispatch(receiveThread(thread)));
  }
}

function shouldFetchThread(state, id) {
  const threadContainer = state.pageThreads.threads.find(th => th.thread.id === id);

  if (!threadContainer) {
    return true;
  } else if (!threadContainer.status.isFetching) {
    return true;
  } else {
    return false;
  }
}

export function fetchThreadIfNeeded(_id) {
  const id = parseInt(_id);
  return (dispatch, getState) => {
    if (shouldFetchThread(getState(), id)) {
      return dispatch(fetchThread(id))
    }
  }
}

// comment:
//   - user_id
//   - comment
function sendNewComment(comment) {
  return {
    type: SEND_NEW_COMMENT,
    comment: comment
  }
}

// receive result for `sendNewComment`
// comment:
//   - id
//   - user_id
//   - comment
//   - timestamp
function receiveNewComment(newComment) {
  return {
    type: RECEIVE_NEW_COMMENT,
    comment: newComment,
    receivedAt: Date.now()
  }
}

function failedNewComment(error, threadId) {
  return {
    type: FAILED_NEW_COMMENT,
    error,
    threadId
  }
}

export function createComment(comment) {
  return dispatch => {
    dispatch(sendNewComment(comment));
    return newComment(comment)
      .then(response => {
        if (response.comment) {
          dispatch(receiveNewComment(response.comment))
        } else {
          dispatch(failedNewComment(response.error, comment.thread_id))
        }
      })
  }
}

function sendNewPost(post) {
  return {
    type: SEND_NEW_POST,
    post: post
  }
}

function receiveNewPost(newPost) {
  return {
    type: RECEIVE_NEW_POST,
    post: newPost,
    receivedAt: Date.now()
  }
}

function failedNewPost(error, threadId) {
  return {
    type: FAILED_NEW_POST,
    error,
    threadId
  }
}

// comment:
//   - user
//   - thread_id
//   - image: file
//   - answer
export function createPost(post) {
  return dispatch => {
    return getBase64(post.image).then((base64) => {
      const postbase64 = {
        ...post,
        image: base64
      };
      dispatch(sendNewPost(postbase64));
      return newPost(post)
        .then(response => {
          if (response.post) {
            dispatch(receiveNewPost(response.post))
          } else {
            dispatch(failedNewPost(response.error, post.thread_id))
          }
        });
    })
  }
}


function requestHomePosts() {
  return {
    type: REQUEST_HOME_POSTS
  }
}

function receiveHomePosts(posts) {
  return {
    type: RECEIVE_HOME_POSTS,
    posts: posts,
    receivedAt: Date.now()
  }
}

export function fetchHomePosts(id) {
  return dispatch => {
    dispatch(requestHomePosts());
    return getHomePosts()
      .then(posts => dispatch(receiveHomePosts(posts)));
  }
}

function requestSignIn() {
  return {
    type: REQUEST_SIGN_IN
  }
}

function failedSignIn(error) {
  return {
    type: FAILED_SIGN_IN,
    error: error
  }
}

function receiveSignIn(user) {
  return {
    type: RECEIVE_SIGN_IN,
    user: user,
    receivedAt: Date.now()
  }
}

// credentials
//   - username
//   - password
export function trySignIn(credentials) {
  return dispatch => {
    dispatch(requestSignIn());
    return doSignIn(credentials)
      .then(response => {
        if (response.user) {
          dispatch(receiveSignIn(response.user))
        } else {
          dispatch(failedSignIn(response.error))
        }
      });
  }
}

function requestSignUp() {
  return {
    type: REQUEST_SIGN_UP
  }
}

function failedSignUp(error) {
  return {
    type: FAILED_SIGN_UP,
    error: error
  }
}

function receiveSignUp(user) {
  return {
    type: RECEIVE_SIGN_UP,
    user: user,
    receivedAt: Date.now()
  }
}

export function trySignUp(credentials) {
  return dispatch => {
    dispatch(requestSignUp());
    return doSignUp(credentials)
      .then(response => {
        if (response.user) {
          dispatch(receiveSignUp(response.user))
        } else {
          dispatch(failedSignUp(response.error))
        }
      });
  }
}

function requestSignOut() {
  return {
    type: REQUEST_SIGN_OUT
  }
}

function failedSignOut(error) {
  return {
    type: FAILED_SIGN_OUT,
    error
  }
}

function receiveSignOut(message) {
  return {
    type: RECEIVE_SIGN_OUT,
    message,
    receivedAt: Date.now()
  }
}

export function trySignOut() {
  return dispatch => {
    dispatch(requestSignOut());
    return doSignOut()
      .then(response => {
        if (response.message) {
          dispatch(receiveSignOut(response.message))
        } else {
          dispatch(failedSignOut(response.error))
        }
      });
  }
}


function requestLoggedInUser() {
  return {
    type: REQUEST_LOGGED_IN_USER
  }
}

function receiveLoggedInUser(user) {
  return {
    type: RECEIVE_LOGGED_IN_USER,
    user,
    receivedAt: Date.now()
  }
}

export function fetchLoggedInUser() {
  return dispatch => {
    dispatch(requestLoggedInUser());
    return getLoggedInUser()
      .then(response => {
        dispatch(receiveLoggedInUser(response.user))
      });
  }
}

export function switchSignInMode(mode) {
  return {
    type: SWITCH_SIGNIN_MODE,
    mode: mode
  }
}
