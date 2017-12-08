'use strict';

import { getThread, newComment, newPost } from '../clientHttp';

// Action Creators
// See: https://redux.js.org/docs/basics/ExampleTodoList.html
export const REQUEST_THREAD = 'REQUEST_THREAD'
export const RECEIVE_THREAD = 'RECEIVE_THREAD'

export const SEND_NEW_COMMENT = 'SEND_NEW_COMMENT'
export const RECEIVE_NEW_COMMENT = 'RECEIVE_NEW_COMMENT'

export const SEND_NEW_POST = 'SEND_NEW_POST'
export const RECEIVE_NEW_POST = 'RECEIVE_NEW_POST'

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
    dispatch(sendNewPost(post));
    return newPost(post)
      .then(newPost => dispatch(receiveNewPost(newPost)));
  }
}
