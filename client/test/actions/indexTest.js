/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// https://redux.js.org/docs/recipes/WritingTests.html


import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  SEND_NEW_COMMENT,
  RECEIVE_NEW_COMMENT,
  createComment
} from '../../src/actions/index'
// import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import { client, newPost, newComment } from '../../src/clientHttp';
import MockAdapter from 'axios-mock-adapter';
const axios = require('axios');
// const mockAxios = new MockAdapter(client);
const mockAxios = new MockAdapter(axios);

describe.skip('async actions', () => {
  // afterEach(() => {
  //   fetchMock.reset()
  //   fetchMock.restore()
  // })
  const myuser = {
    id: 1,
    username: 'admin',
    avatar: 'images/admin.jpg'
  };
  const data = {
    id: 10,
    thread_id: 1,
    comment: 'abcde',
    timestamp: '2017/12/05 22:08',
    user: myuser
  };

  beforeEach(() => {
    // mockAxios.onPost('comments/new').reply(200, data);
    // mockAxios.onPost('/posts/new').reply(200, 'hoge');
    // mockAxios.onAny(/.+/).reply(() => console.log('mockrequest!!!!'));
  });

  // TODO: fix test

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    const expectedActions = [
      { type: SEND_NEW_COMMENT },
      { type: RECEIVE_NEW_COMMENT, comment: data }
    ]
    const store = mockStore({ item: {comments: []} })

    const comment = {
      'user': myuser,
      'thread_id': 1,
      'comment': 'abcde'
    };

    return store.dispatch(createComment(comment)).then(() => {
      // return of async actions
      expect(store.getActions()).to.equal(expectedActions)
    })
  })
  it('mock server test', () => {
    mockAxios.onPost('/posts/new').reply(200, 'hoge');
    mockAxios.onPost('http://localhost:3000/posts/new').reply(200, 'hoge');

    return newPost({
      image: '/path/tp/image',
      answer: 'aaaaa'
    }).then((json) => {
      expect(json.data).to.equal('hoge');
    })
  });
  it('mock server test 2', () => {
    return newComment({
      thread_id: 1,
      comment: 'comment',
      user: {
        id: 1
      }
    }).then((json) => {
      expect(json.data).to.equal('hasdkfjksdf');
    })
  });
})
