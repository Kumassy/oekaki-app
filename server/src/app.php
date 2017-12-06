<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';

// Your App
$app = new Bullet\App();
$app->path('/', function($request) {
  return "Hello World!";
});

$app->path('users', function($request) use($app) {
  $json = file_get_contents(__DIR__ . '/../data/users.json');
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
  //   $app->get(function($request) {
  //     // file_put_contents('php://stderr', print_r($request, TRUE));
  //     file_put_contents('php://stderr', print_r($request->header, TRUE));
  //     return "Admin page";
  //   });
  //
  // });
});

$app->path('posts', function($request) use($app) {
  $json = file_get_contents(__DIR__ . '/../data/posts.json');
  $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $posts = json_decode($json,true);

  $app->get(function($request, $id) use($app, $posts) {
    return $app->response(200, $posts)->header('Access-Control-Allow-Origin', '*');
  });
  $app->param('int', function($request, $id) use($app, $posts) {
    $app->get(function($request) use($app, $posts, $id) {
      return $app->response(200, $posts['posts'][$id - 1])->header('Access-Control-Allow-Origin', '*');
    });
  });

  $app->path('new', function($request) use($app) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
               ->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
               ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $request) {
      file_put_contents('php://stderr', print_r($request->params(), TRUE));
      file_put_contents('php://stderr', print_r($_FILES['image'], TRUE));
      return $app->response(200, "new")
              ->header('Access-Control-Allow-Origin', '*');
    });

  });
});

$app->path('threads', function($request) use($app) {
  $json = file_get_contents(__DIR__ . '/../data/threads.json');
  $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');

  $threads = json_decode($json,true);

  $app->get(function($request) use($app, $threads) {
    return $app->response(200, $threads)->header('Access-Control-Allow-Origin', '*');
  });
  $app->param('int', function($request, $id) use($app, $threads) {
    $app->get(function($request) use($app, $threads, $id) {
      return $app->response(200, $threads['threads'][$id - 1])->header('Access-Control-Allow-Origin', '*');
    });
  });
  $app->path('new', function($request) use($app) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
               ->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
               ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $request) {
      file_put_contents('php://stderr', print_r($request->params(), TRUE));
      file_put_contents('php://stderr', print_r($_FILES['image'], TRUE));
      return $app->response(200, "new")
              ->header('Access-Control-Allow-Origin', '*');
    });

  });
});

$app->path('home', function($request) use($app) {
  $json = file_get_contents(__DIR__ . '/../data/home.json');
  $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $home = json_decode($json,true);

  $app->get(function($request, $id) use($app, $home) {
    return $app->response(200, $home)->header('Access-Control-Allow-Origin', '*');
  });
});

$app->path('comments', function($request) use($app) {
  $json = file_get_contents(__DIR__ . '/../data/comments.json');
  $json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $comments = json_decode($json,true);

  $app->get(function($request, $id) use($app, $comments) {
    return $app->response(200, $comments)->header('Access-Control-Allow-Origin', '*');
  });
  $app->param('int', function($request, $id) use($app, $comments) {
    $app->get(function($request) use($app, $comments, $id) {
      return $app->response(200, $comments['comments'][$id - 1])->header('Access-Control-Allow-Origin', '*');
    });
  });

  $app->path('new', function($request) use($app) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
               ->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
               ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $request) {
      file_put_contents('php://stderr', print_r($request->params(), TRUE));
      file_put_contents('php://stderr', print_r($request->params()['comment'], TRUE));

      $data = array(
        'id' => rand(10, 200),
        'thread_id' => intval($request->params()['thread_id']),
        'comment' => $request->params()['comment'],
        'timestamp' => '2017/12/05 22:08',
        'user' => array(
          'id'=> intval($request->params()['user_id']),
          'username'=> 'bot',                  // get from DB
          'avatar'=> 'images/kumassy.jpg'
        )
      );
      sleep(2);
      return $app->response(200, $data)
              ->header('Access-Control-Allow-Origin', '*');
    });
  });
});

// Run the app! (takes $method, $url or Bullet\Request object)
// echo $app->run(new Bullet\Request());
