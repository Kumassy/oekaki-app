<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/SQLHelper.php';
use \Gurukami\Helpers\Arrays;
use Respect\Validation\Validator as v;

const CLIENT_HOST = 'http://localhost:8000';
// Your App
$conn = getConnection();
$app = new Bullet\App();
$app->path('/', function($request) {
  return "Hello World!";
});

$app->path('users', function($request) use($app, $conn) {
  $app->get(function($request) use($app, $conn) {
    $_users = getAllUsers($conn);
    $users = [
      'users' => $_users
    ];

    return $app->response(200, $users)
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true');
  });
  $app->param('int', function($request, $id) use($app, $conn) {
    $app->get(function($request) use($app, $conn, $id) {
      $_user = getUser($conn, $id);
      $user = [
        'user' => $_user
      ];
      return $app->response(200, $user)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
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

$app->path('posts', function($request) use($app, $conn) {
  $app->get(function($request) use($app, $conn) {
    $_posts = getAllPosts($conn);
    $posts = [
      'posts' => $_posts
    ];
    return $app->response(200, $posts)
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true');
  });
  $app->param('int', function($request, $id) use($app, $conn) {
    $app->get(function($request) use($app, $conn, $id) {
      $_post = getPost($conn, $id);
      $post = [
        'post' => $_post
      ];
      return $app->response(200, $post)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });

  $app->path('new', function($request) use($app, $conn) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true')
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
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });

  });
});

$app->path('threads', function($request) use($app, $conn) {
  $app->get(function($request) use($app, $conn) {
    $_threads = getAllThreads($conn);
    $threads = [
      'threads' => $_threads
    ];
    return $app->response(200, $threads)
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true');
  });
  $app->param('int', function($request, $id) use($app, $conn) {
    $app->get(function($request) use($app, $conn, $id) {
      $_thread = getThread($conn, $id);
      $thread = [
        'thread' => $_thread
      ];
      return $app->response(200, $thread)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });
  $app->path('new', function($request) use($app) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
        ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $request) {
      file_put_contents('php://stderr', print_r($request->params(), TRUE));
      file_put_contents('php://stderr', print_r($_FILES['image'], TRUE));
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });

  });
});

$app->path('home', function($request) use($app, $conn) {
  $app->get(function($request) use($app, $conn) {
    $_posts = getHomePosts($conn);
    $posts = [
      'posts' => $_posts
    ];
    return $app->response(200, $posts)
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true');
  });
});

$app->path('comments', function($request) use($app, $conn) {
  $app->get(function($request) use($app, $conn) {
    $_comments = getAllComments($conn);
    $comments = [
      'comments' => $_comments
    ];
    return $app->response(200, $comments)
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true');
  });
  $app->param('int', function($request, $id) use($app, $conn) {
    $app->get(function($request) use($app, $conn, $id) {
      $_comment = getComment($conn, $id);
      $comment = [
        'comment' => $_comment
      ];
      return $app->response(200, $comment)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });

  $app->path('new', function($request) use($app, $conn) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true')
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
      session_name('j150989k');
      session_start();
      $comment = [
        'user_id' => $_SESSION['user_id'],
        'thread_id' => $request->params()['thread_id'],
        'comment' => $request->params()['comment']
      ];
      print_stderr($comment);
      $_newComment = createComment($conn, $comment);
      $newComment = [
        'comment' => $_newComment
      ];
      print_stderr($newComment);

      // TODO: remove it!
      sleep(2);
      session_write_close();
      return $app->response(200, $newComment)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });
});


$app->path('signin', function($request) use($app, $conn) {
  $app->options(function($request) use($app, $request) {
    return $app->response(200, "new")
             ->header('Access-Control-Allow-Origin', CLIENT_HOST)
             ->header('Access-Control-Allow-Credentials', 'true')
             ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
             ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
  });
  $app->post(function($request) use($app, $conn) {
    $credentials = [
      'username' => Arrays::get('username', $request->params()),
      'password' => Arrays::get('password', $request->params())
    ];

    $response = array();
    if (
      v::keySet(
        v::key('username', v::stringType()->notEmpty()),
        v::key('password', v::stringType()->notEmpty()))->validate($credentials)
    ) {
      $user = tryLogin($conn, $credentials);
      if (
        v::keySet(
          v::key('id', v::intType()->positive()),
          v::key('username', v::stringType()->notEmpty()))->validate($user)
      ) {
        session_name('j150989k');
        session_start();

        $response = [
          'user' => $user
        ];

        $_SESSION['user_id'] = $_user['id'];
        session_write_close();
      } else {
        $response = [
          'error' => 'ユーザー名かパスワードが間違っています'
        ];
      }
    } else {
      $response = [
        'error' => 'ユーザー名かパスワードが入力されていません'
      ];
    }

    return $app->response(200, $response)
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true');
  });
});
// sign up
$app->path('signup', function($request) use($app, $conn) {
  $app->options(function($request) use($app, $request) {
    return $app->response(200, "new")
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true')
      ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
      ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
  });
  $app->post(function($request) use($app, $conn, $request) {
    $credentials = [
      'username' => Arrays::get('username', $request->params()),
      'password' => Arrays::get('password', $request->params())
    ];

    $response = array();
    if (
      v::keySet(
        v::key('username', v::stringType()->notEmpty()),
        v::key('password', v::stringType()->notEmpty()))->validate($credentials)
    ) {
      $user = createUser($conn, $credentials);
      if (
        v::keySet(
          v::key('id', v::intType()->positive()),
          v::key('username', v::stringType()->notEmpty()))->validate($user)
      ) {
        session_name('j150989k');
        session_start();

        $response = [
          'user' => $user
        ];

        $_SESSION['user_id'] = $user['id'];
        session_write_close();
      } else {
        $response = [
          'error' => 'そのユーザー名は既に使用されています'
        ];
      }
    } else {
      $response = [
        'error' => 'ユーザー名かパスワードが入力されていません'
      ];
    }
    return $app->response(200, $response)
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true');
  });
});


$app->path('test', function($request) use($app, $conn) {
  $app->path('set-session', function($request) use($app, $conn) {
    $app->get(function($request) use($app, $conn) {
      session_name('j150989k');
      session_start();
      $_SESSION['message'] = 'hogemessage';

      session_write_close();
      return $app->response(200, 'set-session')
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });
  $app->path('get-session', function($request) use($app, $conn) {
    $app->get(function($request) use($app, $conn) {
      session_name('j150989k');
      session_start();
      $message = $_SESSION['message'];

      session_write_close();
      return $app->response(200, $message)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });
});

// Run the app! (takes $method, $url or Bullet\Request object)
// echo $app->run(new Bullet\Request());
