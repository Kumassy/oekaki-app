<?php
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/utils.php';

function getConnection() {
  return new PDO('pgsql:host=localhost dbname=j150989k user=j150989k');
}
function getImage($conn, $id) {
  $stmt = $conn->prepare('SELECT name FROM images WHERE id = :id');
  $stmt->bindValue("id", $id);
  $stmt->execute();

  return $stmt->fetch(PDO::FETCH_ASSOC);
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
    $user['avatar'] = getImage($conn, $user['id'])['name'];
    unset($user['image_id']);
    return $user;
  }, $_users);
  return $users;
}
