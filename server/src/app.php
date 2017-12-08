<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/SQLHelper.php';

// Your App
$conn = getConnection();
$app = new Bullet\App();
$app->path('/', function($request) {
  return "Hello World!";
});

$app->path('users', function($request) use($app, $conn) {
  $app->get(function($request, $id) use($app, $conn) {
    $_users = getAllUsers($conn);
    $users = [
      'users' => $_users
    ];

    return $app->response(200, $users)->header('Access-Control-Allow-Origin', '*');
  });
  $app->param('int', function($request, $id) use($app, $conn) {
    $app->get(function($request) use($app, $conn, $id) {
      $_user = getUser($conn, $id);
      $user = [
        'user' => $_user
      ];
      return $app->response(200, $user)->header('Access-Control-Allow-Origin', '*');
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

  // sign in
  $app->path('new', function($request) use($app, $conn) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
               ->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
               ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $request) {
      $credentials = [
        'username' => $request->params()['username'],
        'password' => $request->params()['password']
      ];

      $user = createUser($conn, $credentials);

      return $app->response(200, $user)
              ->header('Access-Control-Allow-Origin', '*');
    });

  });
});

$app->path('posts', function($request) use($app, $conn) {
  $app->get(function($request, $id) use($app, $conn) {
    $_posts = getAllPosts($conn);
    $posts = [
      'posts' => $_posts
    ];
    return $app->response(200, $posts)->header('Access-Control-Allow-Origin', '*');
  });
  $app->param('int', function($request, $id) use($app, $conn) {
    $app->get(function($request) use($app, $conn, $id) {
      $_post = getPost($conn, $id);
      $post = [
        'post' => $_post
      ];
      return $app->response(200, $post)->header('Access-Control-Allow-Origin', '*');
    });
  });

  $app->path('new', function($request) use($app, $conn) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
               ->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
               ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $request) {
      $post = [
        'user_id' => $request->params()['user_id'],
        'thread_id' => $request->params()['thread_id'],
        'answer' => $request->params()['answer'],
        'image' => $_FILES['image']
      ];
      $_newPost = createPost($conn, $post);
      $newPost = [
        'post' => $_newPost
      ];

      sleep(2);

      return $app->response(200, $newPost)
              ->header('Access-Control-Allow-Origin', '*');
    });

  });
});

$app->path('threads', function($request) use($app, $conn) {
  $app->get(function($request) use($app, $conn) {
    $_threads = getAllThreads($conn);
    $threads = [
      'threads' => $_threads
    ];
    return $app->response(200, $threads)->header('Access-Control-Allow-Origin', '*');
  });
  $app->param('int', function($request, $id) use($app, $conn) {
    $app->get(function($request) use($app, $conn, $id) {
      $_thread = getThread($conn, $id);
      $thread = [
        'thread' => $_thread
      ];
      return $app->response(200, $thread)->header('Access-Control-Allow-Origin', '*');
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

$app->path('home', function($request) use($app, $conn) {
  $app->get(function($request, $id) use($app, $conn) {
    $_posts = getHomePosts($conn);
    $posts = [
      'posts' => $_posts
    ];
    return $app->response(200, $posts)->header('Access-Control-Allow-Origin', '*');
  });
});

$app->path('comments', function($request) use($app, $conn) {
  $app->get(function($request, $id) use($app, $conn) {
    $_comments = getAllComments($conn);
    $comments = [
      'comments' => $_comments
    ];
    return $app->response(200, $comments)->header('Access-Control-Allow-Origin', '*');
  });
  $app->param('int', function($request, $id) use($app, $conn) {
    $app->get(function($request) use($app, $conn, $id) {
      $_comment = getComment($conn, $id);
      $comment = [
        'comment' => $_comment
      ];
      return $app->response(200, $comment)->header('Access-Control-Allow-Origin', '*');
    });
  });

  $app->path('new', function($request) use($app, $conn) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
               ->header('Access-Control-Allow-Origin', '*')
               ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
               ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $request) {
      // file_put_contents('php://stderr', print_r($request->params(), TRUE));
      // file_put_contents('php://stderr', print_r($request->params()['comment'], TRUE));
      //
      // $data = array(
      //   'id' => rand(10, 200),
      //   'thread_id' => intval($request->params()['thread_id']),
      //   'comment' => $request->params()['comment'],
      //   'timestamp' => '2017/12/05 22:08',
      //   'user' => array(
      //     'id'=> intval($request->params()['user_id']),
      //     'username'=> 'bot',                  // get from DB
      //     'avatar'=> 'images/kumassy.jpg'
      //   )
      // );
      $comment = [
        'user_id' => $request->params()['user_id'],
        'thread_id' => $request->params()['thread_id'],
        'comment' => $request->params()['comment']
      ];
      $_newComment = createComment($conn, $comment);
      $newComment = [
        'comment' => $_newComment
      ];

      // TODO: remove it!
      sleep(2);
      return $app->response(200, $newComment)
              ->header('Access-Control-Allow-Origin', '*');
    });
  });
});


$app->path('login', function($request) use($app, $conn) {
  $app->post(function($request) use($app, $conn) {
    $credentials = [
      'username' => $request->params()['username'],
      'password' => $request->params()['password']
    ];

    $user = tryLogin($conn, $credentials);

    return $app->response(200, $user)->header('Access-Control-Allow-Origin', '*');
  });
});

// Run the app! (takes $method, $url or Bullet\Request object)
// echo $app->run(new Bullet\Request());
