<?php
require __DIR__ . '/vendor/autoload.php';

// Your App
$app = new Bullet\App();
$app->path('/', function($request) {
  return "Hello World!";
});

$app->path('users', function($request) use($app) {
  $json = file_get_contents('data/users.json');
  $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $users = json_decode($json,true);

  $app->get(function($request, $id) use($users) {
    return $users;
  });
  $app->param('int', function($request, $id) use($app, $users) {
    $app->get(function($request) use($users, $id) {
      return $users['users'][$id];
    });
  });
  // $app->path('admin', function($request) use($app) {
  //   $app->get(function() {
  //     return "Admin page";
  //   });
  //
  // });
});

$app->path('posts', function($request) use($app) {
  $json = file_get_contents('data/posts.json');
  $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $posts = json_decode($json,true);

  $app->get(function($request, $id) use($posts) {
    return $posts;
  });
  $app->param('int', function($request, $id) use($app, $posts) {
    $app->get(function($request) use($posts, $id) {
      return $posts['posts'][$id];
    });
  });
});

// Run the app! (takes $method, $url or Bullet\Request object)
echo $app->run(new Bullet\Request());
