'use strict';

import {
  getThread,
  newComment,
  newPost,
  getHomePosts,
  doSignIn,
  doSignUp
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
  SEND_NEW_POST,
  RECEIVE_NEW_POST,

  REQUEST_SIGN_IN,
  RECEIVE_SIGN_IN,
  FAILED_SIGN_IN,

  REQUEST_SIGN_UP,
  RECEIVE_SIGN_UP,
  FAILED_SIGN_UP,

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

export function createComment(comment) {
  return dispatch => {
    dispatch(sendNewComment(comment));
    return newComment(comment)
      .then(newComment => dispatch(receiveNewComment(newComment)))
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
        .then(newPost => dispatch(receiveNewPost(newPost)));
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

export function switchSignInMode(mode) {
  return {
    type: SWITCH_SIGNIN_MODE,
    mode: mode
  }
}
