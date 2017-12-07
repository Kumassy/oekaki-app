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

  public function testUsersIndex()
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


  public function testPostsIndex()
  {
    $expectedJson = <<<EOD
{
  "posts": [
    {
      "id": 1,
      "thread_id": 1,
      "image": "images/image1.png",
      "answer": "あいますく",
      "timestamp": "2017/01/01 12:23",
      "user": {
        "id": 1,
        "username": "pandaman",
        "avatar": "pandaman.png"
      }
    },
    {
      "id": 2,
      "thread_id": 1,
      "image": "images/image2.png",
      "answer": "だんらん",
      "timestamp": "2017/01/01 12:25",
      "user": {
        "id": 2,
        "username": "kumassy",
        "avatar": "kumassy.png"
      }
    },
    {
      "id": 3,
      "thread_id": 1,
      "image": "images/image3.png",
      "answer": "し",
      "timestamp": "2017/01/01 12:28",
      "user": {
        "id": 1,
        "username": "pandaman",
        "avatar": "pandaman.png"
      }
    },
    {
      "id": 4,
      "thread_id": 2,
      "image": "images/image1.png",
      "answer": "つかれたひと",
      "timestamp": "2017/01/03 10:23",
      "user": {
        "id": 1,
        "username": "pandaman",
        "avatar": "pandaman.png"
      }
    },
    {
      "id": 5,
      "thread_id": 2,
      "image": "images/image2.png",
      "answer": "だんらん",
      "timestamp": "2017/01/03 10:25",
      "user": {
        "id": 2,
        "username": "kumassy",
        "avatar": "kumassy.png"
      }
    }
  ]
}
EOD;
  }




  public function testThreadsIndex()
  {
    global $app;
    $res = $app->run('GET', '/threads');
    $this->assertEquals(200, $res->status());
    $this->assertJsonStringEqualsJsonFile(__DIR__ . '/../data/threads.json', $res->content());
  }
}
