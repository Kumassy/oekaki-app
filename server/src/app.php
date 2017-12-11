<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/SQLHelper.php';
use \Gurukami\Helpers\Arrays;
use Respect\Validation\Validator as v;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

const CLIENT_HOST = 'http://localhost:8000';

$log = new Logger('my-api-server');
$log->pushHandler(new StreamHandler(__DIR__ . '/../logs/app.log', Logger::DEBUG));

// Your App
$conn = getConnection();
$app = new Bullet\App();
// $app->path('/', function($request) {
//   return "Hello World!";
// });

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

$app->path('posts', function($request) use($app, $conn, $log) {
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

  $app->path('new', function($request) use($app, $conn, $log) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
        ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $log, $request) {
      $log->addInfo('/posts/new');
      session_name('j150989k');
      session_start();

      $post = [
        'user_id' => intval(Arrays::get('user_id', $_SESSION)),
        'thread_id' =>  intval(Arrays::get('thread_id', $request->params())),
        'answer' =>  Arrays::get('answer', $request->params()),
        'image' => Arrays::get('image', $_FILES)
      ];
      $log->info('request:', $post);

      $response = array();
      if (!v::key('user_id', v::intType()->positive())->validate($post)) {
        $response = [
          'error' => [
            'type' => 'SIGNIN_REQUIRED',
            'message' => '画像を投稿するにはログインが必要です'
          ]
        ];
      }
      //
      else if (
        v::keySet(
          v::key('user_id', v::intType()->positive()),
          v::key('thread_id', v::intType()->positive()),
          v::key('answer', v::stringType()->regex('/^[ぁ-んー]+$/u')),
          v::key('image', v::notEmpty()))->validate($post)
      ) {

        $newPost = createPost($conn, $post);
        $response = [
          'post' => $newPost
        ];


      } else {
        $response = [
          'error' => [
            'type' => 'INVALID_INPUT',
            'message' => '必要事項が入力されていないか、形式が間違っています'
          ]
        ];
      }

      session_write_close();
      sleep(2);

      $log->info('response:', $response);
      return $app->response(200, $response)
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

$app->path('comments', function($request) use($app, $conn, $log) {
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

  $app->path('new', function($request) use($app, $conn, $log) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
        ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $log, $request) {
      $log->addInfo('/comments/new');
      session_name('j150989k');
      session_start();

      $comment = [
        'user_id' => intval(Arrays::get('user_id', $_SESSION)),
        'thread_id' => intval(Arrays::get('thread_id', $request->params())),
        'comment' => Arrays::get('comment', $request->params())
      ];
      $log->info('request:', $comment);

      $response = array();

      if (!v::key('user_id', v::intType()->positive())->validate($comment)) {
        $response = [
          'error' => [
            'type' => 'SIGNIN_REQUIRED',
            'message' => 'コメントを投稿するにはログインが必要です'
          ]
        ];
      }
      else if (
        v::keySet(
          v::key('user_id', v::intType()->positive()),
          v::key('thread_id', v::intType()->positive()),
          v::key('comment', v::stringType()->notEmpty()))->validate($comment)
      ) {
        // print_stderr($comment);
        $newComment = createComment($conn, $comment);
        $response = [
          'comment' => $newComment
        ];
        // print_stderr($newComment);
      } else {
        $response = [
          'error' => [
            'type' => 'INVALID_INPUT',
            'message' => '必要事項が入力されていないか、形式が間違っています'
          ]
        ];
      }

      // TODO: remove it!
      sleep(2);
      session_write_close();

      $log->info('response:', $response);
      return $app->response(200, $response)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });
});


$app->path('user', function($request) use($app, $conn, $log) {
  $app->get(function($request) use($app, $conn) {
    session_name('j150989k');
    session_start();

    $response = array();
    if (v::key('user_id', v::intType()->positive())->validate($_SESSION)) {
      $id = Arrays::get('user_id', $_SESSION);
      $user = getUser($conn, $id);
      $response = [
        'user' => $user
      ];
    } else {
      $response = [
        'user' => []
      ];
    }
    session_write_close();

    return $app->response(200, $response)
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true');
  });
  $app->path('signin', function($request) use($app, $conn, $log) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
               ->header('Access-Control-Allow-Origin', CLIENT_HOST)
               ->header('Access-Control-Allow-Credentials', 'true')
               ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
               ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $log) {
      $log->addInfo('/user/signin');
      $credentials = [
        'username' => Arrays::get('username', $request->params()),
        'password' => Arrays::get('password', $request->params())
      ];

      $log->info('request:', $credentials);

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
            'error' => [
              'type' => 'INVALID_INPUT',
              'message' => 'ユーザー名かパスワードが間違っています'
            ]
          ];
        }
      } else {
        $response = [
          'error' => [
            'type' => 'EMPTY_INPUT',
            'message' => 'ユーザー名かパスワードが入力されていません'
          ]
        ];
      }

      $log->info('response:', $response);
      return $app->response(200, $response)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });
  // sign up
  $app->path('signup', function($request) use($app, $conn, $log) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
        ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $log, $request) {
      $log->addInfo('/user/signup');
      $credentials = [
        'username' => Arrays::get('username', $request->params()),
        'password' => Arrays::get('password', $request->params())
      ];
      $log->info('request:', $credentials);

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
            'error' => [
              'type' => 'USER_ALREADY_EXIST',
              'message' => 'そのユーザー名は既に使用されています'
            ]
          ];
        }
      } else {
        $response = [
          'error' => [
            'type' => 'EMPTY_INPUT',
            'message' => 'ユーザー名かパスワードが入力されていません'
          ]
        ];
      }
      $log->info('response:', $response);
      return $app->response(200, $response)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });

  // sign OutOfBoundsException
  $app->path('signout', function($request) use($app, $conn) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
        ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $request) {
      session_name('j150989k');
      session_start();

      $response = array();
      if (v::key('user_id', v::intType()->positive())->validate($_SESSION)) {
        session_destroy();

        $response = [
          'message' => [
            'type' => 'SIGNOUT_SUCCESS',
            'message' => 'ログアウトしました'
          ]
        ];
      } else {
        $response = [
          'error' => [
            'type' => 'USER_ID_NOT_FOUND',
            'message' => 'ログイン情報がありませんでした'
          ]
        ];
      }

      session_write_close();
      return $app->response(200, $response)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
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
  $app->path('regex', function($request) use($app, $conn) {
    $app->get(function($request) use($app, $conn) {
      $post = [
        'user_id' => 1,
        'thread_id' =>  1,
        'answer' =>  'あ'
      ];

      $response = array();

      if (v::keySet(
        v::key('user_id', v::intType()->positive()),
        v::key('thread_id', v::intType()->positive()),
        v::key('answer', v::stringType()->notEmpty()->regex('/^[ぁ-ん]+$/u'))
      )->validate($post)) {
        $response = [
          'validation' => 'ok',
          'post' => $post
        ];
      } else {
        $response = [
          'validation' => 'ng',
          'post' => $post
        ];
      }


      return $app->response(200, $response)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });
});
// Run the app! (takes $method, $url or Bullet\Request object)
// echo $app->run(new Bullet\Request());
