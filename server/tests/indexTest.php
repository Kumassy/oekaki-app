<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/app.php';

require_once __DIR__ . '/DatabaseTestBase.php';

// class DatabaseTest extends TestCase
// PHPUnit_TestCase
class DatabaseTest extends DatabaseTestBase
{
  public function setUp()
  {
    parent::setUp();
  }

  public function testUserRowCount()
  {
    $this->assertEquals(2, $this->getConnection()->getRowCount('users'), "Pre-Condition");
  }

  public function testSelectUser()
  {
    $stmt = $this->getPOD()->query('SELECT * FROM users');
    $users = array();
    foreach ($stmt as $user) {
      $u = array();
      $u['id'] = $user['id'];
      $u['login_name'] = $user['login_name'];
      $users[] = $u;
    }
    $json = json_encode($users);


    $expectedJson = <<<EOD
[
  {
    "id": 1,
    "login_name": "aaaaa"
  },
  {
    "id": 2,
    "login_name": "bbbbb"
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
