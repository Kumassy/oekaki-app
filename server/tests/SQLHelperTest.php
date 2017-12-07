<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/utils.php';
require_once __DIR__ . '/../src/SQLHelper.php';

require_once __DIR__ . '/DatabaseTestBase.php';

class SQLHelperTest extends DatabaseTestBase
{
  public function setUp()
  {
    parent::setUp();
  }

  public function testGetImage()
  {
    $image = getImage($this->getPOD(), 2);

    $expected = [
      'id' => 2,
      'name' => 'images/kumassy.jpg'
    ];
    $this->assertEquals($expected, $image);
  }

  public function testGetUser()
  {
    $user = getUser($this->getPOD(), 2);

    $expected = [
      'id' => 2,
      'username' => 'kumassy',
      'avatar' => 'images/kumassy.jpg'
    ];
    $this->assertEquals($expected, $user);
  }
}
