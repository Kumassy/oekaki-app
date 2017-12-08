<?php
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/utils.php';

use Ramsey\Uuid\Uuid;

function getConnection() {
  return new PDO('pgsql:host=localhost dbname=j150989k user=j150989k');
}
function getImage($conn, $id) {
  $stmt = $conn->prepare('SELECT id, name FROM images WHERE id = :id');
  $stmt->bindValue("id", $id);
  $stmt->execute();

  $image = $stmt->fetch(PDO::FETCH_ASSOC);
  if (strpos($image['name'], 'images/') === false) {
    $image['name'] = 'images/' . $image['name'];
  }

  return $image;
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

function getHomePosts($conn)
{
  $stmt = $conn->prepare('SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts WHERE thread_id = :id');
  $stmt->bindValue("id", 1);
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


// $comment = [
//   'user_id' => 3,
//   'thread_id' => 2,
//   'comment' => 'test_comment'
// ];

function createComment($conn, $comment)
{
  $conn->beginTransaction();
  try {
    $stmt = $conn->prepare('INSERT INTO comments (user_id, thread_id, comment, created_at, updated_at) VALUES (:user_id, :thread_id, :comment, NOW(), NOW())');
    $stmt->bindValue("user_id", $comment['user_id']);
    $stmt->bindValue("thread_id", $comment['thread_id']);
    $stmt->bindValue("comment", $comment['comment']);
    $stmt->execute();

    $id = $conn->lastInsertId();
    $conn->commit();
    return getComment($conn, $id);
  } catch (Exception $e) {
    // トランザクション取り消し
    $conn->rollBack();
    throw $e;
  }
}

// $image == $_FILES['image']
function createImage($conn, $image) {
  $conn->beginTransaction();
  try {
    $path_info = pathinfo($image['name']);
    $filename = Uuid::uuid4()->toString() . '.' . $path_info['extension'];
    $stmt = $conn->prepare('INSERT INTO images (name, created_at, updated_at) VALUES (:name, NOW(), NOW())');
    $stmt->bindValue("name", $filename);
    $stmt->execute();

    $uploaddir = __DIR__ . "/../images/";
    $uploadfile = $uploaddir.basename($filename);
    if (is_uploaded_file($image['tmp_name']) && move_uploaded_file($image['tmp_name'], $uploadfile)) {
      // success
      $id = $conn->lastInsertId();
      $conn->commit();
      return getImage($conn, $id);
    } else {
      $conn->rollBack();
      return;
    }
  } catch (Exception $e) {
    // トランザクション取り消し
    $conn->rollBack();
    throw $e;
  }
}

// $post = [
//   'user_id' => 3,
//   'thread_id' => 2,
//   'answer' => 'okane'
//   'image' => $_FILES['image']
// ];
function createPost($conn, $post)
{
  $image = createImage($conn, $post['image']);

  $conn->beginTransaction();
  try {
    $stmt = $conn->prepare('INSERT INTO posts (user_id, thread_id, image_id, answer, created_at, updated_at) VALUES (:user_id, :thread_id, :image_id, :answer, NOW(), NOW())');
    $stmt->bindValue("user_id", $post['user_id']);
    $stmt->bindValue("thread_id", $post['thread_id']);
    $stmt->bindValue("image_id", $image['id']);
    $stmt->bindValue("answer", $post['answer']);
    $stmt->execute();

    $id = $conn->lastInsertId();
    $conn->commit();
    return getPost($conn, $id);
  } catch (Exception $e) {
    // トランザクション取り消し
    $conn->rollBack();
    throw $e;
  }
}


function createUser($conn, $credentials)
{
  $hash = password_hash($credentials['password'], PASSWORD_DEFAULT);

  $conn->beginTransaction();
  try {
    $stmt = $conn->prepare('INSERT INTO users (username, password, image_id, created_at, updated_at) VALUES (:username, :password, NULL, NOW(), NOW())');
    $stmt->bindValue("username", $credentials['username']);
    $stmt->bindValue("password", $hash);
    $stmt->execute();

    $id = $conn->lastInsertId();
    $conn->commit();
    return getUser($conn, $id);
  } catch (Exception $e) {
    $conn->rollBack();
    throw $e;
  }
}

function tryLogin($conn, $credentials)
{
  $stmt = $conn->prepare('SELECT * FROM users WHERE username = :username');
  $stmt->bindValue("username", $credentials['username']);
  $stmt->execute();

  $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if (count($users) == 1 && password_verify($credentials['password'], $users[0]['password'])) {
    return getUser($conn, $users[0]['id']);
  }
}
