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
$app->path('/', function($request) {
  return "Hello World!";
});

$app->path('users', function($request) use($app, $conn, $log) {
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
      $user = getUser($conn, $id);
      $posts = getPostsForUser($conn, $id);
      $response = [
        'user' => $user,
        'posts' => $posts
      ];
      return $app->response(200, $response)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });
  $app->path('search', function($request) use($app, $conn, $log) {
    $app->get(function($request) use($app, $conn, $log) {
      $log->addInfo('/users/search');

      $keyword = Arrays::get('keyword', $request->params());
      $log->addInfo('request:'.$keyword);

      $response = array();
      if (v::stringType()->validate($keyword)) {
        $users = searchUsers($conn, $keyword);
        $response = [
          'users' => $users
        ];
      } else {
        $response = [
          'error' => [
            'type' => 'INVALID_INPUT',
            'message' => '必要事項が入力されていないか、形式が間違っています'
          ]
        ];
      }

      $log->addInfo('response:'.$response);
      return $app->response(200, $response)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });
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
          v::key('answer', v::stringType()->regex('/^[ぁ-ん]+$/u')),
          v::key('image', v::notEmpty()))->validate($post)
      ) {
        $thread = getThread($conn, $post['thread_id']);
        if (!$thread['is_open']) {
          $response = [
            'error' => [
              'type' => 'THREAD_CLOESD',
              'message' => 'このスレッドのしりとりは終了したため、画像を追加できません'
            ]
          ];
        } else {
          $newPost = createPost($conn, $post);
          if (checkShiritoriSuccess($conn, $post['thread_id'])) {
            $response = [
              'status' => 'SUCCESS',
              'post' => $newPost
            ];
          } else {
            closeThread($conn, $post['thread_id']);
            $thread = getThread($conn, $post['thread_id']);
            $response = [
              'status' => 'FAILURE',
              'thread' => $thread
            ];
          }
        }
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

$app->path('threads', function($request) use($app, $conn, $log) {
  $app->get(function($request) use($app, $conn) {
    $_threads = getAllThreads($conn);
    $threads = [
      'threads' => $_threads
    ];
    return $app->response(200, $threads)
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true');
  });
  $app->param('int', function($request, $id) use($app, $conn, $log) {
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
  $app->path('new', function($request) use($app, $conn, $log) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
        ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $log, $request) {
      $log->addInfo('/threads/new');
      session_name('j150989k');
      session_start();

      $post = [
        'user_id' => intval(Arrays::get('user_id', $_SESSION)),
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
          v::key('answer', v::stringType()->regex('/^[ぁ-ん]+$/u')),
          v::key('image', v::notEmpty()))->validate($post)
      ) {

        $newPost = createThread($conn, $post);
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
            v::key('username', v::stringType()->notEmpty()),
            v::key('avatar', v::stringType()->notEmpty(), false),
            v::key('posts_count', v::intType()),
            v::key('comments_count', v::intType()))->validate($user)
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
            v::key('username', v::stringType()->notEmpty()),
            v::key('avatar', v::stringType()->notEmpty(), false),
            v::key('posts_count', v::intType()),
            v::key('comments_count', v::intType()))->validate($user)
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

  $app->path('password', function($request) use($app, $conn, $log) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
        ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $log, $request) {
      $log->addInfo('/user/password');
      session_name('j150989k');
      session_start();

      $credentials = [
        'id' => intval(Arrays::get('user_id', $_SESSION)),
        'currentPassword' =>  Arrays::get('currentPassword', $request->params()),
        'newPassword' =>  Arrays::get('newPassword', $request->params())
      ];
      $log->info('request:', $credentials);

      $response = array();
      if (!v::key('id', v::intType()->positive())->validate($credentials)) {
        $response = [
          'error' => [
            'type' => 'SIGNIN_REQUIRED',
            'message' => 'パスワードを変更するにはログインが必要です'
          ]
        ];
      } else if (
        !v::keySet(
          v::key('id', v::intType()->positive()),
          v::key('currentPassword', v::stringType()->notEmpty()),
          v::key('newPassword', v::stringType()->notEmpty()))->validate($credentials)
      ) {
        $response = [
          'error' => [
            'type' => 'EMPTY_INPUT',
            'message' => 'パスワードが入力されていません'
          ]
        ];
      } else {
        $user = updatePassword($conn, $credentials);

        if (v::keySet(
          v::key('id', v::intType()->positive()),
          v::key('username', v::stringType()->notEmpty()),
          v::key('avatar', v::stringType()->notEmpty(), false),
          v::key('posts_count', v::intType()),
          v::key('comments_count', v::intType()))->validate($user)
        ) {
          $response = [
            'user' => $user
          ];
        } else {
          $response = [
            'error' => [
              'type' => 'INVALID_INPUT',
              'message' => 'パスワードが間違っています'
            ]
          ];
        }
      }

      session_write_close();
      $log->info('response:', $response);
      return $app->response(200, $response)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });

  $app->path('avatar', function($request) use($app, $conn, $log) {
    $app->options(function($request) use($app, $request) {
      return $app->response(200, "new")
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
        ->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
    });
    $app->post(function($request) use($app, $conn, $log, $request) {
      $log->addInfo('/user/avatar');
      session_name('j150989k');
      session_start();

      $user = [
        'id' => intval(Arrays::get('user_id', $_SESSION)),
        'avatar' => Arrays::get('avatar', $_FILES)
      ];
      $log->info('request:', $user);


      $response = array();
      if (!v::key('id', v::intType()->positive())->validate($user)) {
        $response = [
          'error' => [
            'type' => 'SIGNIN_REQUIRED',
            'message' => '画像を変更するにはログインが必要です'
          ]
        ];
      }
      else if (
        !v::keySet(
          v::key('id', v::intType()->positive()),
          v::key('avatar', v::notEmpty()))->validate($user)
      ) {
        $response = [
          'error' => [
            'type' => 'EMPTY_INPUT',
            'message' => '画像が入力されていません'
          ]
        ];
      } else {
        $newUser = updateAvatar($conn, $user);

        if (v::keySet(
          v::key('id', v::intType()->positive()),
          v::key('username', v::stringType()->notEmpty()),
          v::key('avatar', v::stringType()->notEmpty(), false),
          v::key('posts_count', v::intType()),
          v::key('comments_count', v::intType()))->validate($newUser)
        ) {
          $response = [
            'user' => $newUser
          ];
        } else {
          $response = [
            'error' => [
              'type' => 'FAILED_UPDATE',
              'message' => '画像のアップデートに失敗しました'
            ]
          ];
        }
      }

      session_write_close();
      $log->info('response:', $response);
      return $app->response(200, $response)
        ->header('Access-Control-Allow-Origin', CLIENT_HOST)
        ->header('Access-Control-Allow-Credentials', 'true');
    });
  });
});



$app->path('test', function($request) use($app, $conn) {
  $app->get(function($request) use($app, $conn) {
    print_stderr($request->params());
    return $app->response(200, $request->params())
      ->header('Access-Control-Allow-Origin', CLIENT_HOST)
      ->header('Access-Control-Allow-Credentials', 'true');
  });
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
