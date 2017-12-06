'use strict';

import reducer from '../../src/reducers/index'
import {
  REQUEST_THREAD,
  RECEIVE_THREAD,
  SEND_NEW_COMMENT,
  RECEIVE_NEW_COMMENT
} from '../../src/actions/index';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal({
      thread: {
        isFetching: false,
        item: {}
      }
    })
  })

  it('should handle SEND_NEW_COMMENT', () => {
    const state = {
      thread: {
        isFetching: false,
        item: {
          comments: [
            {
              id: 1,
              comment: 'text'
            }
          ]
        }
      }
    };
    const action = {
      type: SEND_NEW_COMMENT,
      comment: {
        id: 2,
        comment: 'text2'
      }
    };
    const newState = {
      thread: {
        isFetching: false,
        item: {
          comments: [
            {
              id: 1,
              comment: 'text'
            },
            {
              id: 2,
              comment: 'text2',
              isSending: true
            }
          ]
        }
      }
    };
    expect(reducer(state, action)).to.deep.equal(newState);
  })

  it('should handle RECEIVE_NEW_COMMENT', () => {
    const state = {
      thread: {
        isFetching: false,
        item: {
          comments: [
            {
              id: 1,
              comment: 'text',
              timestamp: '**timestamp**'
            },
            {
              id: 2,
              comment: 'text2',
              isSending: true
            }
          ]
        }
      }
    };
    const action = {
      type: RECEIVE_NEW_COMMENT,
      comment: {
        id: 2,
        comment: 'text2',
        timestamp: '**timestamp2**'
      }
    };
    const newState = {
      thread: {
        isFetching: false,
        item: {
          comments: [
            {
              id: 1,
              comment: 'text',
              timestamp: '**timestamp**'
            },
            {
              id: 2,
              comment: 'text2',
              timestamp: '**timestamp2**'
            }
          ]
        }
      }
    };
    expect(reducer(state, action)).to.deep.equal(newState);
  })
})
