'use strict';
import axios from 'axios';

export const _host = 'http://localhost:3000';

export const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  withCredentials: true
});

export function newComment(comment) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    }
  }
  const params = new FormData();
  params.append('user_id', comment.user.id);
  params.append('thread_id', comment.thread_id);
  params.append('comment', comment.comment);

  return client.post('/comments/new', params, config).then(json => json.data.comment);
}

export function newPost(post) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  const params = new FormData();
  params.append('image', post.image);
  params.append('user_id', post.user.id);
  params.append('thread_id', post.thread_id);
  params.append('answer', post.answer);

  return client.post('/posts/new', params, config).then(json => json.data.post);
}

export function newThread(post) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.post('/threads/new', post, config);
}

export function getThread(id) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.get(`/threads/${id}`).then(json => json.data.thread);
}

export function getHomePosts() {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.get(`/home`).then(json => json.data.posts);
}

export function doSignUp(credentials) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.post('/signup', credentials, config).then(json => json.data.user);
}

export function doSignIn(credentials) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.post('/signin', credentials, config).then(json => json.data.user);
}
