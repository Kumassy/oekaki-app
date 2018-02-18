'use strict';
import axios from 'axios';

export const _host = 'http://localhost:8080';

export const client = axios.create({
  baseURL: 'http://localhost:8080/api/v0/',
  timeout: 5000,
  withCredentials: true
});

export function newComment(comment) {
  const config = {
    headers: {
      // 'content-type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    }
  }
  // const params = new FormData();
  // // params.append('user_id', comment.user.id);
  // params.append('thread_id', comment.thread_id);
  // params.append('message', comment.comment);

  return client.post('/comments', {
      thread_id: comment.threadId,
      message: comment.message
    }, config).then(json => json.data);
}

export function newPost(post) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  // const params = new FormData();
  // params.append('image', post.image);
  // // params.append('user_id', post.user.id);
  // params.append('thread_id', post.threadId);
  // params.append('answer', post.answer);

  return client.post('/posts', {
    image: post.image,
    thread_id: post.threadId,
    caption: post.caption
  }, config).then(json => json.data);
}

export function newThread(post) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  // const params = new FormData();
  // params.append('image', post.image);
  // params.append('user_id', post.user.id);
  // params.append('answer', post.answer);

  return client.post('/threads', {
    image: post.image,
    user_id: post.user.id,
    answer: post.answer
  }, config).then(json => json.data);
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

export function getUsers() {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.get(`/users`).then(json => json.data.users);
}

export function searchUsers(keyword) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.get(`/users/search`, {
    params: {
      keyword
    }
  }).then(json => json.data.users);
}

export function getUserPosts(id) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.get(`/users/${id}`).then(json => json.data);
}

export function getPosts() {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.get(`/posts`).then(json => json.data.posts);
}

export function doSignUp(credentials) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.post('/user/signup', credentials, config).then(json => json.data);
}

export function doSignIn(credentials) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.post('/user/signin', credentials, config).then(json => json.data);
}

export function doSignOut(credentials) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.post('/user/signout', {}, config).then(json => json.data);
}

export function getLoggedInUser() {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.get('/user', {}, config).then(json => json.data);
}

export function patchUserPassword(credentials) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  // const params = new FormData();
  // params.append('currentPassword', credentials.currentPassword);
  // params.append('newPassword', credentials.newPassword);

  return client.post('/user/password', {
    currentPassword: credentials.currentPassword,
    newPassword: credentials.newPassword
  }, config).then(json => json.data);
}

export function patchUserAvatar(user) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  const params = new FormData();
  params.append('avatar', user.avatar)

  return client.post('/user/avatar', params, config).then(json => json.data);
}
