<?php
// namespace MyApp;
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/app.php';

global $app;
echo $app->run(new Bullet\Request());
