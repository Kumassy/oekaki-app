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
      pageThreads: {
        threads: []
      }
    })
  })

  it('should add new thread with REQUEST_THREAD', () => {
    const state = {
      pageThreads: {
        threads: []
      }
    };

    const action = {
      type: REQUEST_THREAD,
      threadId: 1
    };
    const expected = {
      pageThreads: {
        threads: [
          {
            status: {
              isFetching: true
            },
            thread: {
              id: 1
            }
          }
        ]
      }
    };

    expect(reducer(state, action)).to.deep.equal(expected);
  })

  it('should refresh thread state with REQUEST_THREAD', () => {
    const state = {
      pageThreads: {
        threads: [
          {
            status: {
              isFetching: false,
              lastUpdated: '123456'
            },
            thread: {
              id: 1,
              comments: [],
              posts: []
            }
          },
          {
            status: {
              isFetching: false,
              lastUpdated: '56789'
            },
            thread: {
              id: 2,
              comments: [],
              posts: []
            }
          }
        ]
      }
    };

    const action = {
      type: REQUEST_THREAD,
      threadId: 2
    };
    const expected = {
      pageThreads: {
        threads: [
          {
            status: {
              isFetching: false,
              lastUpdated: '123456'
            },
            thread: {
              id: 1,
              comments: [],
              posts: []
            }
          },
          {
            status: {
              isFetching: true,
              lastUpdated: '56789'
            },
            thread: {
              id: 2,
              comments: [],
              posts: []
            }
          }
        ]
      }
    };

    expect(reducer(state, action)).to.deep.equal(expected);
  })

  it('should handle RECEIVE_THREAD', () => {
    const state = {
      pageThreads: {
        threads: [
          {
            status: {
              isFetching: true,
              lastUpdated: '12345'
            },
            thread: {
              id: 2
            }
          }
        ]
      }
    };

    const action = {
      type: RECEIVE_THREAD,
      thread: {
        id: 2,
        comments: [
          {
            id: 1
          }
        ]
      },
      receivedAt: '5678'
    };
    const expected = {
      pageThreads: {
        threads: [
          {
            status: {
              isFetching: false,
              lastUpdated: '5678'
            },
            thread: {
              id: 2,
              comments: [
                {
                  id: 1
                }
              ]
            }
          }
        ]
      }
    };

    expect(reducer(state, action)).to.deep.equal(expected);
  })



  it('should handle SEND_NEW_COMMENT', () => {
    const state = {
      pageThreads: {
        threads: [
          {
            status: {},
            thread: {
              id: 1,
              posts: [
                {
                  id: 1
                }
              ],
              comments: [
                {
                  id: 10
                }
              ]
            }
          },
          {
            status: {
              isFetching: false
            },
            thread: {
              id: 2,
              posts: [
                {
                  id: 1
                }
              ],
              comments: [
                {
                  id: 1,
                  comment: 'text'
                }
              ]
            }
          }
        ]
      }
    };
    const action = {
      type: SEND_NEW_COMMENT,
      comment: {
        thread_id: 2,
        comment: 'text2'
      }
    };
    const newState = {
      pageThreads: {
        threads: [
          {
            status: {},
            thread: {
              id: 1,
              posts: [
                {
                  id: 1
                }
              ],
              comments: [
                {
                  id: 10
                }
              ]
            }
          },
          {
            status: {
              isFetching: false
            },
            thread: {
              id: 2,
              posts: [
                {
                  id: 1
                }
              ],
              comments: [
                {
                  id: 1,
                  comment: 'text'
                },
                {
                  thread_id: 2,
                  comment: 'text2',
                  isSending: true
                }
              ]
            }
          }
        ]
      }
    };
    expect(reducer(state, action)).to.deep.equal(newState);
  })

  it('should handle RECEIVE_NEW_COMMENT', () => {
    const state =  {
      pageThreads: {
        threads: [
          {
            status: {},
            thread: {
              id: 1,
              posts: [
                {
                  id: 1
                }
              ],
              comments: [
                {
                  id: 10
                }
              ]
            }
          },
          {
            status: {
              isFetching: false
            },
            thread: {
              id: 2,
              posts: [
                {
                  id: 1
                }
              ],
              comments: [
                {
                  id: 1,
                  comment: 'text'
                },
                {
                  thread_id: 2,
                  comment: 'text2',
                  isSending: true
                }
              ]
            }
          }
        ]
      }
    };
    const action = {
      type: RECEIVE_NEW_COMMENT,
      comment: {
        id: 2,
        thread_id: 2,
        comment: 'text2'
      }
    };
    const newState = {
      pageThreads: {
        threads: [
          {
            status: {},
            thread: {
              id: 1,
              posts: [
                {
                  id: 1
                }
              ],
              comments: [
                {
                  id: 10
                }
              ]
            }
          },
          {
            status: {
              isFetching: false
            },
            thread: {
              id: 2,
              posts: [
                {
                  id: 1
                }
              ],
              comments: [
                {
                  id: 1,
                  comment: 'text'
                },
                {
                  id: 2,
                  thread_id: 2,
                  comment: 'text2'
                }
              ]
            }
          }
        ]
      }
    };
    expect(reducer(state, action)).to.deep.equal(newState);
  })
})
