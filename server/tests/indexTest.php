<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/app.php';
require_once __DIR__ . '/../src/utils.php';

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
    $stmt = $this->getPOD()->query('SELECT * FROM users');
    $_users = array();
    foreach ($stmt as $user) {
      $_users[] = $user;
    }
    $users = array_map(function($user) {
      return array_filter_keys($user, ['id', 'username', 'image_id']);
    }, $_users);
    $json = json_encode($users);


    $expectedJson = <<<EOD
[
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
EOD;
    $this->assertJsonStringEqualsJsonString($expectedJson, $json);
  }


  public function testThreadIndex()
  {
    global $app;
    $res = $app->run('GET', '/threads');
    $this->assertEquals(200, $res->status());
    $this->assertJsonStringEqualsJsonFile(__DIR__ . '/../data/threads.json', $res->content());
  }
}
