<?php
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/utils.php';

use Ramsey\Uuid\Uuid;
use Respect\Validation\Validator as v;

function getConnection() {
  // return new PDO('pgsql:host=localhost dbname=j150989k user=j150989k');
  return pg_connect("host=localhost dbname=j150989k user=j150989k");
}
function getImage($conn, $id) {
  // $stmt = $conn->prepare('SELECT id, name FROM images WHERE id = :id');
  // $stmt->bindValue("id", $id);
  // $stmt->execute();
  //
  // $image = $stmt->fetch(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_image", 'SELECT id, name FROM images WHERE id = $1');
  $stmt = pg_execute($conn, "get_image", array($id));
  $image = pg_fetch_assoc($stmt);
  pg_query($conn, "DEALLOCATE get_image");


  $image['name'] = 'images/' . $image['name'];
  $image['id'] = intval($image['id']);

  return $image;
}

// image_id 未設定 → avatar key を作らない
function getUser($conn, $id) {
  // $stmt = $conn->prepare('SELECT id, username, image_id FROM users WHERE id = :id');
  // $stmt->bindValue("id", $id);
  // $stmt->execute();
  //
  // $user = $stmt->fetch(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_user", 'SELECT id, username, image_id FROM users WHERE id = $1');
  $stmt = pg_execute($conn, "get_user", array($id));
  $user = pg_fetch_assoc($stmt);
  pg_query($conn, "DEALLOCATE get_user");

  $user['image_id'] = intval($user['image_id']);
  if (v::key('image_id', v::intType()->positive())->validate($user)) {
    $user['avatar'] = getImage($conn, intval($user['image_id']))['name'];
  }
  unset($user['image_id']);

  $user['id'] = intval($user['id']);

  return $user;
}
function getAllUsers($conn)
{
  // $stmt = $conn->prepare('SELECT id, username, image_id FROM users');
  // $stmt->execute();
  // $_users = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_all_users", 'SELECT id, username, image_id FROM users');
  $stmt = pg_execute($conn, "get_all_users", array());
  $_users = pg_fetch_all($stmt);
  pg_query($conn, "DEALLOCATE get_all_users");

  if ($_users === FALSE) {
    $_users = array();
  }

  // print_stderr($_users);

  // $users = array_map(function($user) {
  //   return array_filter_keys($user, ['id', 'username', 'image_id']);
  // }, $_users);

  $users = array_map(function($user) use($conn) {
    $user['image_id'] = intval($user['image_id']);
    if (v::key('image_id', v::intType()->positive())->validate($user)) {
      $user['avatar'] = getImage($conn, intval($user['image_id']))['name'];
    }
    unset($user['image_id']);
    $user['id'] = intval($user['id']);
    return $user;
  }, $_users);
  return $users;
}

function getPost($conn, $id)
{
  // $stmt = $conn->prepare('SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts WHERE id = :id');
  // $stmt->bindValue("id", $id);
  // $stmt->execute();
  // $post = $stmt->fetch(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_post", 'SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts WHERE id = $1');
  $stmt = pg_execute($conn, "get_post", array($id));
  $post = pg_fetch_assoc($stmt);
  pg_query($conn, "DEALLOCATE get_post");

  $post['image'] = getImage($conn, intval($post['image_id']))['name'];
  unset($post['image_id']);
  $post['user'] = getUser($conn, intval($post['user_id']));
  unset($post['user_id']);

  $post['id'] = intval($post['id']);
  $post['thread_id'] = intval($post['thread_id']);

  return $post;
}

function getAllPosts($conn)
{
  // $stmt = $conn->prepare('SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts');
  // $stmt->execute();
  // $_posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_all_posts", 'SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts');
  $stmt = pg_execute($conn, "get_all_posts", array());
  $_posts = pg_fetch_all($stmt);
  pg_query($conn, "DEALLOCATE get_all_posts");

  if ($_posts === FALSE) {
    $_posts = array();
  }

  $posts = array_map(function($post) use($conn) {
    $post['image'] = getImage($conn, intval($post['image_id']))['name'];
    unset($post['image_id']);

    $post['user'] = getUser($conn, intval($post['user_id']));
    unset($post['user_id']);

    $post['id'] = intval($post['id']);
    $post['thread_id'] = intval($post['thread_id']);
    return $post;
  }, $_posts);
  return $posts;
}

function getComment($conn, $id)
{
  // $stmt = $conn->prepare('SELECT id, user_id, thread_id, comment,  updated_at FROM comments WHERE id = :id');
  // $stmt->bindValue("id", $id);
  // $stmt->execute();
  // $comment = $stmt->fetch(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_comment", 'SELECT id, user_id, thread_id, comment,  updated_at FROM comments WHERE id = $1');
  $stmt = pg_execute($conn, "get_comment", array($id));
  $comment = pg_fetch_assoc($stmt);
  pg_query($conn, "DEALLOCATE get_comment");

  $comment['user'] = getUser($conn, intval($comment['user_id']));
  unset($comment['user_id']);

  $comment['id'] = intval($comment['id']);
  $comment['thread_id'] = intval($comment['thread_id']);

  return $comment;
}
function getAllComments($conn)
{
  // $stmt = $conn->prepare('SELECT id, user_id, thread_id, comment,  updated_at FROM comments');
  // $stmt->execute();
  // $_comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_all_comments", 'SELECT id, user_id, thread_id, comment,  updated_at FROM comments');
  $stmt = pg_execute($conn, "get_all_comments", array());
  $_comments = pg_fetch_all($stmt);
  pg_query($conn, "DEALLOCATE get_all_comments");

  if ($_comments === FALSE) {
    $_comments = array();
  }

  $comments = array_map(function($comment) use($conn) {
    $comment['user'] = getUser($conn, intval($comment['user_id']));
    unset($comment['user_id']);

    $comment['id'] = intval($comment['id']);
    $comment['thread_id'] = intval($comment['thread_id']);
    return $comment;
  }, $_comments);
  return $comments;
}

function getPostsForThread($conn, $thread_id)
{
  // $stmt = $conn->prepare('SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts WHERE thread_id = :id');
  // $stmt->bindValue("id", $thread_id);
  // $stmt->execute();
  // $_posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_posts_for_thread", 'SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts WHERE thread_id = $1');
  $stmt = pg_execute($conn, "get_posts_for_thread", array($thread_id));
  $_posts = pg_fetch_all($stmt);
  pg_query($conn, "DEALLOCATE get_posts_for_thread");

  if ($_posts === FALSE) {
    $_posts = array();
  }

  $posts = array_map(function($post) use($conn) {
    $post['image'] = getImage($conn, intval($post['image_id']))['name'];
    unset($post['image_id']);

    $post['user'] = getUser($conn, intval($post['user_id']));
    unset($post['user_id']);

    $post['id'] = intval($post['id']);
    $post['thread_id'] = intval($post['thread_id']);
    return $post;
  }, $_posts);
  return $posts;
}

function getCommentsForThread($conn, $thread_id)
{
  // $stmt = $conn->prepare('SELECT id, user_id, thread_id, comment,  updated_at FROM comments WHERE thread_id = :id');
  // $stmt->bindValue("id", $thread_id);
  // $stmt->execute();
  // $_comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_comments_for_thread", 'SELECT id, user_id, thread_id, comment,  updated_at FROM comments WHERE thread_id = $1');
  $stmt = pg_execute($conn, "get_comments_for_thread", array($thread_id));
  $_comments = pg_fetch_all($stmt);
  pg_query($conn, "DEALLOCATE get_comments_for_thread");

  if ($_comments === FALSE) {
    $_comments = array();
  }

  $comments = array_map(function($comment) use($conn) {
    $comment['user'] = getUser($conn, intval($comment['user_id']));
    unset($comment['user_id']);

    $comment['id'] = intval($comment['id']);
    $comment['thread_id'] = intval($comment['thread_id']);
    return $comment;
  }, $_comments);
  return $comments;
}

function getThread($conn, $id)
{
  // $stmt = $conn->prepare('SELECT id, is_open, updated_at FROM threads WHERE id = :id');
  // $stmt->bindValue("id", $id);
  // $stmt->execute();
  // $thread = $stmt->fetch(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_thread", 'SELECT id, is_open, updated_at FROM threads WHERE id = $1');
  $stmt = pg_execute($conn, "get_thread", array($id));
  $thread = pg_fetch_assoc($stmt);
  pg_query($conn, "DEALLOCATE get_thread");

  $thread['posts'] = getPostsForThread($conn, intval($thread['id']));
  $thread['comments'] = getCommentsForThread($conn, intval($thread['id']));

  $thread['id'] = intval($thread['id']);
  return $thread;
}

function getAllThreads($conn)
{
  // $stmt = $conn->prepare('SELECT id, is_open, updated_at FROM threads');
  // $stmt->execute();
  // $_threads = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_all_threads", 'SELECT id, is_open, updated_at FROM threads');
  $stmt = pg_execute($conn, "get_all_threads", array());
  $_threads = pg_fetch_all($stmt);
  pg_query($conn, "DEALLOCATE get_all_threads");

  if ($_threads === FALSE) {
    $_threads = array();
  }

  $threads = array_map(function($thread) use($conn) {
    $thread['posts'] = getPostsForThread($conn, intval($thread['id']));
    $thread['comments'] = getCommentsForThread($conn, intval($thread['id']));

    $thread['id'] = intval($thread['id']);
    return $thread;
  }, $_threads);
  return $threads;
}

function getHomePosts($conn)
{
  // $stmt = $conn->prepare('SELECT id, user_id, thread_id, image_id, answer, updated_at FROM posts WHERE thread_id = :id');
  // $stmt->bindValue("id", 1);
  // $stmt->execute();
  // $_posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "get_home_posts", 'SELECT * FROM (SELECT DISTINCT ON (p.thread_id) p.id, p.user_id, p.thread_id, p.image_id, p.answer, p.updated_at FROM posts p, threads t WHERE p.thread_id=t.id AND t.is_open = true order by p.thread_id, p.updated_at desc ) as dt order by updated_at desc');
  $stmt = pg_execute($conn, "get_home_posts", array());
  $_posts = pg_fetch_all($stmt);
  pg_query($conn, "DEALLOCATE get_home_posts");

  if ($_posts === FALSE) {
    $_posts = array();
  }

  $posts = array_map(function($post) use($conn) {
    $post['image'] = getImage($conn, intval($post['image_id']))['name'];
    unset($post['image_id']);

    $post['user'] = getUser($conn, intval($post['user_id']));
    unset($post['user_id']);

    $post['id'] = intval($post['id']);
    $post['thread_id'] = intval($post['thread_id']);
    return $post;
  }, $_posts);
  return $posts;

  // get threads
  // for each
  // select * from comments where thread_id = 2 order by created_at asc limit 1;
}


// $comment = [
//   'user_id' => 3,
//   'thread_id' => 2,
//   'comment' => 'test_comment'
// ];

function createComment($conn, $comment)
{
  // $conn->beginTransaction();
  // try {
  //   $stmt = $conn->prepare('INSERT INTO comments (user_id, thread_id, comment, created_at, updated_at) VALUES (:user_id, :thread_id, :comment, NOW(), NOW())');
  //   $stmt->bindValue("user_id", $comment['user_id']);
  //   $stmt->bindValue("thread_id", $comment['thread_id']);
  //   $stmt->bindValue("comment", $comment['comment']);
  //   $stmt->execute();
  //
  //   $id = $conn->lastInsertId();
  //   $conn->commit();
  //   return getComment($conn, $id);
  // } catch (Exception $e) {
  //   // トランザクション取り消し
  //   $conn->rollBack();
  //   throw $e;
  // }
  $stmt = pg_prepare($conn, "create_comment", 'INSERT INTO comments (user_id, thread_id, comment, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id, user_id, thread_id, comment, updated_at');
  $stmt = pg_execute($conn, "create_comment", array($comment['user_id'], $comment['thread_id'], $comment['comment']));
  $comment = pg_fetch_assoc($stmt);
  pg_query($conn, "DEALLOCATE create_comment");

  $comment['user'] = getUser($conn, intval($comment['user_id']));
  unset($comment['user_id']);

  $comment['id'] = intval($comment['id']);
  $comment['thread_id'] = intval($comment['thread_id']);

  return $comment;
}

// $image == $_FILES['image']
function createImage($conn, $image) {
  // $conn->beginTransaction();
  // try {
  //   $path_info = pathinfo($image['name']);
  //   $filename = Uuid::uuid4()->toString() . '.' . $path_info['extension'];
  //   $stmt = $conn->prepare('INSERT INTO images (name, created_at, updated_at) VALUES (:name, NOW(), NOW())');
  //   $stmt->bindValue("name", $filename);
  //   $stmt->execute();
  //
  //   $uploaddir = __DIR__ . "/../images/";
  //   $uploadfile = $uploaddir.basename($filename);
  //   if (is_uploaded_file($image['tmp_name']) && move_uploaded_file($image['tmp_name'], $uploadfile)) {
  //     // success
  //     $id = $conn->lastInsertId();
  //     $conn->commit();
  //     return getImage($conn, $id);
  //   } else {
  //     $conn->rollBack();
  //     return;
  //   }
  // } catch (Exception $e) {
  //   // トランザクション取り消し
  //   $conn->rollBack();
  //   throw $e;
  // }

  $path_info = pathinfo($image['name']);
  $filename = Uuid::uuid4()->toString() . '.' . $path_info['extension'];

  $uploaddir = __DIR__ . "/../images/";
  $uploadfile = $uploaddir.basename($filename);
  if (is_uploaded_file($image['tmp_name']) && move_uploaded_file($image['tmp_name'], $uploadfile)) {
    // success
    $stmt = pg_prepare($conn, "create_image", 'INSERT INTO images (name, created_at, updated_at) VALUES ($1, NOW(), NOW()) RETURNING id, name');
    $stmt = pg_execute($conn, "create_image", array($filename));
    $newImage = pg_fetch_assoc($stmt);
    pg_query($conn, "DEALLOCATE create_image");

    $newImage['name'] = 'images/' . $newImage['name'];
    $newImage['id'] = intval($newImage['id']);

    return $newImage;
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
  // $image = createImage($conn, $post['image']);
  //
  // $conn->beginTransaction();
  // try {
  //   $stmt = $conn->prepare('INSERT INTO posts (user_id, thread_id, image_id, answer, created_at, updated_at) VALUES (:user_id, :thread_id, :image_id, :answer, NOW(), NOW())');
  //   $stmt->bindValue("user_id", $post['user_id']);
  //   $stmt->bindValue("thread_id", $post['thread_id']);
  //   $stmt->bindValue("image_id", $image['id']);
  //   $stmt->bindValue("answer", $post['answer']);
  //   $stmt->execute();
  //
  //   $id = $conn->lastInsertId();
  //   $conn->commit();
  //   return getPost($conn, $id);
  // } catch (Exception $e) {
  //   // トランザクション取り消し
  //   $conn->rollBack();
  //   throw $e;
  // }
  $image = createImage($conn, $post['image']);

  $stmt = pg_prepare($conn, "create_post", 'INSERT INTO posts (user_id, thread_id, image_id, answer, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id, user_id, thread_id, image_id, answer, updated_at');
  $stmt = pg_execute($conn, "create_post", array($post['user_id'], $post['thread_id'], $image['id'], $post['answer']));
  $post = pg_fetch_assoc($stmt);
  pg_query($conn, "DEALLOCATE create_post");


  $post['image'] = getImage($conn, intval($post['image_id']))['name'];
  unset($post['image_id']);
  $post['user'] = getUser($conn, intval($post['user_id']));
  unset($post['user_id']);

  $post['id'] = intval($post['id']);
  $post['thread_id'] = intval($post['thread_id']);

  return $post;

}
function createThread($conn, $post)
{
  // pg_query($conn, "BEGIN");

  $stmt = pg_prepare($conn, "create_thread", 'INSERT INTO threads (is_open, created_at, updated_at) VALUES (true, NOW(), NOW()) RETURNING id');
  $stmt = pg_execute($conn, "create_thread", array());
  $thread = pg_fetch_assoc($stmt);
  pg_query($conn, "DEALLOCATE create_thread");
  $thread['id'] = intval($thread['id']);

  if (v::key('id', v::intType()->positive())->validate($thread)) {
    $post['thread_id'] = $thread['id'];

    $newPost = createPost($conn, $post);
    if (v::key('id', v::intType()->positive())->validate($newPost)) {
      // pg_query($conn, "END");
      return $newPost;
    }
  }

  // pg_query($conn, "ABORT");
}


function createUser($conn, $credentials)
{
  $hash = password_hash($credentials['password'], PASSWORD_DEFAULT);

  // $conn->beginTransaction();
  // try {
  //   $stmt = $conn->prepare('INSERT INTO users (username, password, image_id, created_at, updated_at) VALUES (:username, :password, NULL, NOW(), NOW())');
  //   $stmt->bindValue("username", $credentials['username']);
  //   $stmt->bindValue("password", $hash);
  //   $stmt->execute();
  //
  //   $id = $conn->lastInsertId();
  //   $conn->commit();
  //   return getUser($conn, $id);
  // } catch (Exception $e) {
  //   $conn->rollBack();
  //   throw $e;
  // }
  $stmt = pg_prepare($conn, "create_user", 'INSERT INTO users (username, password, image_id, created_at, updated_at) VALUES ($1, $2, NULL, NOW(), NOW()) RETURNING id, username, image_id');
  $stmt = pg_execute($conn, "create_user", array($credentials['username'], $hash));
  $user = pg_fetch_assoc($stmt);
  pg_query($conn, "DEALLOCATE create_user");

  $user['image_id'] = intval($user['image_id']);
  if (v::key('image_id', v::intType()->positive())->validate($user)) {
    $user['avatar'] = getImage($conn, $user['image_id'])['name'];
  }
  unset($user['image_id']);

  $user['id'] = intval($user['id']);
  return $user;
}

function tryLogin($conn, $credentials)
{
  // $stmt = $conn->prepare('SELECT * FROM users WHERE username = :username');
  // $stmt->bindValue("username", $credentials['username']);
  // $stmt->execute();
  //
  // $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt = pg_prepare($conn, "try_login", 'SELECT * FROM users WHERE username = $1');
  $stmt = pg_execute($conn, "try_login", array($credentials['username']));
  $users = pg_fetch_all($stmt);
  pg_query($conn, "DEALLOCATE try_login");

  if (count($users) == 1 && password_verify($credentials['password'], $users[0]['password'])) {
    return getUser($conn, intval($users[0]['id']));
  }
}
