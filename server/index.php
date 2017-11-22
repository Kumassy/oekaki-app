<?php
require __DIR__ . '/vendor/autoload.php';

// Your App
$app = new Bullet\App();
$app->path('/', function($request) {
  return "Hello World!";
});

$app->path('users', function($request) use($app) {
  $app->get(function() {
    return "User page";
  });
  $app->path('admin', function($request) use($app) {
    $app->get(function() {
      return "Admin page";
    });

  });
});

// Run the app! (takes $method, $url or Bullet\Request object)
echo $app->run(new Bullet\Request());
