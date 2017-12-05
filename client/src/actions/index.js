'use strict';

import { getThread } from '../clientHttp';

// Action Creators
// See: https://redux.js.org/docs/basics/ExampleTodoList.html
export const REQUEST_THREAD = 'REQUEST_THREAD'
export const RECEIVE_THREAD = 'RECEIVE_THREAD'

function requestThread() {
  return {
    type: REQUEST_THREAD
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
    dispatch(requestThread());
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
