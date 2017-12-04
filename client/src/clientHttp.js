import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
});

export function newComment(comment) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.post('/comments/new', comment, config);
}

export function newPost(post) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.post('/posts/new', post, config);
}

export function newThread(post) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return client.post('/threads/new', post, config);
}
