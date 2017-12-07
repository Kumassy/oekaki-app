<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/app.php';
require_once __DIR__ . '/../src/utils.php';
require_once __DIR__ . '/../src/SQLHelper.php';

require_once __DIR__ . '/DatabaseTestBase.php';

// class DatabaseTest extends TestCase
// PHPUnit_TestCase
class DatabaseTest extends DatabaseTestBase
{
  public function setUp()
  {
    parent::setUp();
  }

  public function testUsersRowCount()
  {
    $this->assertEquals(3, $this->getConnection()->getRowCount('users'), "Pre-Condition");
  }

  public function testGetUsers()
  {
    global $app;
    $res = $app->run('GET', '/users');

    $expectedJson = <<<EOD
{
  "users": [
    {
      "id": 1,
      "username": "pandaman",
      "avatar": "images/pandaman.jpg"
    },
    {
      "id": 2,
      "username": "kumassy",
      "avatar": "images/kumassy.jpg"
    },
    {
      "id": 3,
      "username": "furikake",
      "avatar": "images/furikake.jpg"
    }
  ]
}
EOD;
    $this->assertEquals(200, $res->status());
    $this->assertJsonStringEqualsJsonString($expectedJson, $res->content());
  }

  public function testGetUser()
  {
    global $app;
    $res = $app->run('GET', '/users/3');

    $expectedJson = <<<EOD
{
  "user": {
    "id": 3,
    "username": "furikake",
    "avatar": "images/furikake.jpg"
  }
}
EOD;
    $this->assertEquals(200, $res->status());
    $this->assertJsonStringEqualsJsonString($expectedJson, $res->content());
  }


  public function testGetPosts()
  {
    global $app;
    $res = $app->run('GET', '/posts');

    $expectedJson = <<<EOD
{
  "posts": [
    {
      "id": 1,
      "thread_id": 1,
      "image": "images/pandaman.jpg",
      "answer": "aimasuku",
      "updated_at": "2017-12-14 12:00:00",
      "user": {
        "id": 1,
        "username": "pandaman",
        "avatar": "images/pandaman.jpg"
      }
    },
    {
      "id": 2,
      "thread_id": 1,
      "image": "images/pandaman.jpg",
      "answer": "danran",
      "updated_at": "2017-12-14 12:00:00",
      "user": {
        "id": 2,
        "username": "kumassy",
        "avatar": "images/kumassy.jpg"
      }
    },
    {
      "id": 3,
      "thread_id": 1,
      "image": "images/pandaman.jpg",
      "answer": "shi",
      "updated_at": "2017-12-14 12:00:00",
      "user": {
        "id": 1,
        "username": "pandaman",
        "avatar": "images/pandaman.jpg"
      }
    },
    {
      "id": 4,
      "thread_id": 2,
      "image": "images/pandaman.jpg",
      "answer": "tukaretahito",
      "updated_at": "2017-12-14 12:00:00",
      "user": {
        "id": 1,
        "username": "pandaman",
        "avatar": "images/pandaman.jpg"
      }
    },
    {
      "id": 5,
      "thread_id": 2,
      "image": "images/kumassy.jpg",
      "answer": "danran",
      "updated_at": "2017-12-16 18:00:00",
      "user": {
        "id": 2,
        "username": "kumassy",
        "avatar": "images/kumassy.jpg"
      }
    }
  ]
}
EOD;
    $this->assertEquals(200, $res->status());
    $this->assertJsonStringEqualsJsonString($expectedJson, $res->content());
  }

  public function testGetPost()
  {
    global $app;
    $res = $app->run('GET', '/posts/4');

    $expectedJson = <<<EOD
{
  "post": {
    "id": 4,
    "thread_id": 2,
    "image": "images/pandaman.jpg",
    "answer": "tukaretahito",
    "updated_at": "2017-12-14 12:00:00",
    "user": {
      "id": 1,
      "username": "pandaman",
      "avatar": "images/pandaman.jpg"
    }
  }
}
EOD;
    $this->assertEquals(200, $res->status());
    $this->assertJsonStringEqualsJsonString($expectedJson, $res->content());
  }


  public function testGetThreads()
  {
    global $app;
    $res = $app->run('GET', '/threads');
    $this->assertEquals(200, $res->status());
    $this->assertJsonStringEqualsJsonFile(__DIR__ . '/../data/threads.json', $res->content());
  }
}
