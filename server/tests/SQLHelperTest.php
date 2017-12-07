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
      'name' => 'images/kumassy.jpg'
    ];
    $this->assertEquals($expected, $image);
  }
}
