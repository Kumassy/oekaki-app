'use strict';

import {
  getThread,
  newComment,
  newPost,
  newThread,
  getHomePosts,
  getUsers,
  getPosts,
  doSignIn,
  doSignUp,
  doSignOut,
  getLoggedInUser,
  patchUserPassword,
  patchUserAvatar
} from '../clientHttp';
import { getBase64 } from '../utils';

// Action Creators
// See: https://redux.js.org/docs/basics/ExampleTodoList.html
import {
  REQUEST_HOME_POSTS,
  RECEIVE_HOME_POSTS,

  REQUEST_USERS,
  RECEIVE_USERS,

  REQUEST_POSTS,
  RECEIVE_POSTS,

  REQUEST_THREAD,
  RECEIVE_THREAD,

  SEND_NEW_COMMENT,
  RECEIVE_NEW_COMMENT,
  FAILED_NEW_COMMENT,

  SEND_NEW_POST,
  RECEIVE_NEW_POST,
  FAILED_NEW_POST,

  SEND_NEW_THREAD,
  RECEIVE_NEW_THREAD,
  FAILED_NEW_THREAD,

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

  SWITCH_SIGNIN_MODE,

  NEW_POST_INPUT_CHANGE_FILE,
  NEW_POST_INPUT_CHANGE_ANSWER,
  NEW_POST_INPUT_CLEAR,
  NEW_POST_CLOSE_DIALOG,

  NEW_THREAD_INPUT_CHANGE_FILE,
  NEW_THREAD_INPUT_CHANGE_ANSWER,
  NEW_THREAD_INPUT_CLEAR,
  NEW_THREAD_CLOSE_DIALOG,

  NEW_COMMENT_INPUT_CHANGE_COMMENT,
  NEW_COMMENT_INPUT_CLEAR,
  NEW_COMMENT_CLOSE_DIALOG,

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

export function createComment(comment, form) {
  return dispatch => {
    dispatch(sendNewComment(comment));
    return newComment(comment)
      .then(response => {
        if (response.comment) {
          dispatch(receiveNewComment(response.comment))
          dispatch(newCommentInputClear());
          form.reset();
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
export function createPost(post, form) {
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
            dispatch(receiveNewPost(response.post));
            dispatch(newPostInputClear());
            form.reset();
          } else {
            dispatch(failedNewPost(response.error, post.thread_id))
          }
        });
    })
  }
}

function sendNewThread(post) {
  return {
    type: SEND_NEW_THREAD,
    post
  }
}

function receiveNewThread(newPost) {
  return {
    type: RECEIVE_NEW_THREAD,
    post: newPost,
    receivedAt: Date.now()
  }
}

function failedNewThread(error) {
  return {
    type: FAILED_NEW_THREAD,
    error
  }
}

export function createThread(post, form) {
  return dispatch => {
    return getBase64(post.image).then((base64) => {
      const postbase64 = {
        ...post,
        image: base64
      };
      dispatch(sendNewThread(postbase64));
      return newThread(post)
        .then(response => {
          if (response.post) {
            dispatch(receiveNewThread(response.post));
            dispatch(newThreadInputClear());
            form.reset();
          } else {
            dispatch(failedNewThread(response.error))
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

function requestUsers() {
  return {
    type: REQUEST_USERS
  }
}

function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
    receivedAt: Date.now()
  }
}

export function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers());
    return getUsers()
      .then(users => dispatch(receiveUsers(users)));
  }
}

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
    receivedAt: Date.now()
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return getPosts()
      .then(posts => dispatch(receivePosts(posts)));
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

export function newPostInputFileChanged(file) {
  return {
    type: NEW_POST_INPUT_CHANGE_FILE,
    file
  }
}

export function newPostInputAnswerChanged(answer) {
  return {
    type: NEW_POST_INPUT_CHANGE_ANSWER,
    answer
  }
}

export function newPostInputClear() {
  return {
    type: NEW_POST_INPUT_CLEAR
  }
}

export function newPostCloseDialog() {
  return {
    type: NEW_POST_CLOSE_DIALOG
  }
}

export function newCommentInputCommentChanged(comment) {
  return {
    type: NEW_COMMENT_INPUT_CHANGE_COMMENT,
    comment
  }
}

export function newCommentInputClear() {
  return {
    type: NEW_COMMENT_INPUT_CLEAR
  }
}

export function newCommentCloseDialog() {
  return {
    type: NEW_COMMENT_CLOSE_DIALOG
  }
}

export function newThreadInputFileChanged(file) {
  return {
    type: NEW_THREAD_INPUT_CHANGE_FILE,
    file
  }
}

export function newThreadInputAnswerChanged(answer) {
  return {
    type: NEW_THREAD_INPUT_CHANGE_ANSWER,
    answer
  }
}

export function newThreadInputClear() {
  return {
    type: NEW_THREAD_INPUT_CLEAR
  }
}

export function newThreadCloseDialog() {
  return {
    type: NEW_THREAD_CLOSE_DIALOG
  }
}


export function settingsInputCurrentPasswordChanged(currentPassword) {
  return {
    type: SETTINGS_INPUT_CHANGE_CURRENT_PASSWORD,
    currentPassword
  }
}

export function settingsInputNewPasswordChanged(newPassword) {
  return {
    type: SETTINGS_INPUT_CHANGE_NEW_PASSWORD,
    newPassword
  }
}

export function settingsInputNewPasswordConfirmChanged(newPasswordConfirm) {
  return {
    type: SETTINGS_INPUT_CHANGE_NEW_PASSWORD_CONFIRM,
    newPasswordConfirm
  }
}

export function settingsInputClearPassword() {
  return {
    type: SETTINGS_INPUT_CLEAR_PASSWORD
  }
}

export function settingsCloseDialogPassword() {
  return {
    type: SETTINGS_CLOSE_DIALOG_PASSWORD
  }
}

export function settingsInputFileChanged(file) {
  return {
    type: SETTINGS_INPUT_CHANGE_FILE,
    file
  }
}

export function settingsInputClearFile() {
  return {
    type: SETTINGS_INPUT_CLEAR_FILE
  }
}

export function settingsCloseDialogFile() {
  return {
    type: SETTINGS_CLOSE_DIALOG_FILE
  }
}


function requestUpdatePassword() {
  return {
    type: REQUEST_UPDATE_PASSWORD
  }
}

function failedUpdatePassword(error) {
  return {
    type: FAILED_UPDATE_PASSWORD,
    error
  }
}

function receiveUpdatePassword(user) {
  return {
    type: RECEIVE_UPDATE_PASSWORD,
    user,
    receivedAt: Date.now()
  }
}

export function updatePassword(credentials) {
  return dispatch => {
    dispatch(requestUpdatePassword());
    return patchUserPassword(credentials)
      .then(response => {
        if (response.user) {
          dispatch(receiveUpdatePassword(response.user))
          dispatch(settingsInputClearPassword())
        } else {
          dispatch(failedUpdatePassword(response.error))
        }
      });
  }
}

function requestUpdateAvatar() {
  return {
    type: REQUEST_UPDATE_AVATAR
  }
}

function failedUpdateAvatar(error) {
  return {
    type: FAILED_UPDATE_AVATAR,
    error
  }
}

function receiveUpdateAvatar(user) {
  return {
    type: RECEIVE_UPDATE_AVATAR,
    user,
    receivedAt: Date.now()
  }
}

export function updateAvatar(user) {
  return dispatch => {
    dispatch(requestUpdateAvatar());
    return patchUserAvatar(user)
      .then(response => {
        if (response.user) {
          dispatch(receiveUpdateAvatar(response.user))
          dispatch(settingsInputClearFile())
        } else {
          dispatch(failedUpdateAvatar(response.error))
        }
      });
  }
}
