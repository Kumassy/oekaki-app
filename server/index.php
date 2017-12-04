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

  $app->get(function($request, $id) use($app, $posts) {
    return $app->response(200, $posts)->header('Access-Control-Allow-Origin', '*');
  });
  $app->param('int', function($request, $id) use($app, $posts) {
    $app->get(function($request) use($app, $posts, $id) {
      return $app->response(200, $posts['posts'][$id])->header('Access-Control-Allow-Origin', '*');
    });
  });
});

$app->path('comments', function($request) use($app) {
  $json = file_get_contents('data/comments.json');
  $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $comments = json_decode($json,true);

  $app->get(function($request, $id) use($app, $comments) {
    return $app->response(200, $comments)->header('Access-Control-Allow-Origin', '*');
  });
  $app->param('int', function($request, $id) use($app, $comments) {
    $app->get(function($request) use($app, $comments, $id) {
      return $app->response(200, $comments['comments'][$id])->header('Access-Control-Allow-Origin', '*');
    });
  });
});

// Run the app! (takes $method, $url or Bullet\Request object)
echo $app->run(new Bullet\Request());
