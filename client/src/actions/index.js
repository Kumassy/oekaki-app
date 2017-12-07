'use strict';

import { getThread, newComment } from '../clientHttp';

// Action Creators
// See: https://redux.js.org/docs/basics/ExampleTodoList.html
export const REQUEST_THREAD = 'REQUEST_THREAD'
export const RECEIVE_THREAD = 'RECEIVE_THREAD'

export const SEND_NEW_COMMENT = 'SEND_NEW_COMMENT'
export const RECEIVE_NEW_COMMENT = 'RECEIVE_NEW_COMMENT'

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
  const thread = state.thread.item;

  if (!thread) {
    return true;
  } else if (!thread.isFetching) {
    return true;
  } else {
    return false;
  }
}

export function fetchThreadIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchThread(getState(), id)) {
      return dispatch(fetchThread(id))
    }
  }
}

// comment:
//   - user_id
//   - comment
function sendNewComment(threadId, comment) {
  return {
    type: SEND_NEW_COMMENT,
    threadId: threadId,
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
