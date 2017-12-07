<?php
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/utils.php';

function getConnection() {
  return new PDO('pgsql:host=localhost dbname=j150989k user=j150989k');
}
function getImage($conn, $id) {
  $stmt = $conn->prepare('SELECT id, name FROM images WHERE id = :id');
  $stmt->bindValue("id", $id);
  $stmt->execute();

  return $stmt->fetch(PDO::FETCH_ASSOC);
}
function getUser($conn, $id) {
  $stmt = $conn->prepare('SELECT id, username, image_id FROM users WHERE id = :id');
  $stmt->bindValue("id", $id);
  $stmt->execute();

  $user = $stmt->fetch(PDO::FETCH_ASSOC);
  $user['avatar'] = getImage($conn, $user['image_id'])['name'];
  unset($user['image_id']);

  return $user;
}
function getAllUsers($conn)
{
  $stmt = $conn->prepare('SELECT id, username, image_id FROM users');
  $stmt->execute();
  $_users = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // print_stderr($_users);

  // $users = array_map(function($user) {
  //   return array_filter_keys($user, ['id', 'username', 'image_id']);
  // }, $_users);

  $users = array_map(function($user) use($conn) {
    $user['avatar'] = getImage($conn, $user['image_id'])['name'];
    unset($user['image_id']);
    return $user;
  }, $_users);
  return $users;
}

function getPost($conn, $id)
{
  $stmt = $conn->prepare('SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts WHERE id = :id');
  $stmt->bindValue("id", $id);
  $stmt->execute();
  $post = $stmt->fetch(PDO::FETCH_ASSOC);

  $post['image'] = getImage($conn, $post['image_id'])['name'];
  unset($post['image_id']);
  $post['user'] = getUser($conn, $post['user_id']);
  unset($post['user_id']);

  return $post;
}

function getAllPosts($conn)
{
  $stmt = $conn->prepare('SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts');
  $stmt->execute();
  $_posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $posts = array_map(function($post) use($conn) {
    $post['image'] = getImage($conn, $post['image_id'])['name'];
    unset($post['image_id']);

    $post['user'] = getUser($conn, $post['user_id']);
    unset($post['user_id']);
    return $post;
  }, $_posts);
  return $posts;
}

function getComment($conn, $id)
{
  $stmt = $conn->prepare('SELECT id, user_id, thread_id, comment,  updated_at FROM comments WHERE id = :id');
  $stmt->bindValue("id", $id);
  $stmt->execute();
  $comment = $stmt->fetch(PDO::FETCH_ASSOC);

  $comment['user'] = getUser($conn, $comment['user_id']);
  unset($comment['user_id']);

  return $comment;
}
function getAllComments($conn)
{
  $stmt = $conn->prepare('SELECT id, user_id, thread_id, comment,  updated_at FROM comments');
  $stmt->execute();
  $_comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $comments = array_map(function($comment) use($conn) {
    $comment['user'] = getUser($conn, $comment['user_id']);
    unset($comment['user_id']);
    return $comment;
  }, $_comments);
  return $comments;
}

function getPostsForThread($conn, $thread_id)
{
  $stmt = $conn->prepare('SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts WHERE thread_id = :id');
  $stmt->bindValue("id", $thread_id);
  $stmt->execute();
  $_posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $posts = array_map(function($post) use($conn) {
    $post['image'] = getImage($conn, $post['image_id'])['name'];
    unset($post['image_id']);

    $post['user'] = getUser($conn, $post['user_id']);
    unset($post['user_id']);
    return $post;
  }, $_posts);
  return $posts;
}

function getCommentsForThread($conn, $thread_id)
{
  $stmt = $conn->prepare('SELECT id, user_id, thread_id, comment,  updated_at FROM comments WHERE thread_id = :id');
  $stmt->bindValue("id", $thread_id);
  $stmt->execute();
  $_comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $comments = array_map(function($comment) use($conn) {
    $comment['user'] = getUser($conn, $comment['user_id']);
    unset($comment['user_id']);
    return $comment;
  }, $_comments);
  return $comments;
}

function getThread($conn, $id)
{
  $stmt = $conn->prepare('SELECT id, is_open, updated_at FROM threads WHERE id = :id');
  $stmt->bindValue("id", $id);
  $stmt->execute();
  $thread = $stmt->fetch(PDO::FETCH_ASSOC);

  $thread['posts'] = getPostsForThread($conn, $thread['id']);
  $thread['comments'] = getCommentsForThread($conn, $thread['id']);

  return $thread;
}

function getAllThreads($conn)
{
  $stmt = $conn->prepare('SELECT id, is_open, updated_at FROM threads');
  $stmt->execute();
  $_threads = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $threads = array_map(function($thread) use($conn) {
    $thread['posts'] = getPostsForThread($conn, $thread['id']);
    $thread['comments'] = getCommentsForThread($conn, $thread['id']);
    return $thread;
  }, $_threads);
  return $threads;
}
