<?php

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/utils.php';


class UtilsTest extends PHPUnit_Framework_TestCase
{
  public function testArrayFilterKeys()
  {
    $array = [
      0 => 'aaa',
      'a' => 'aaa',
      1 => 'bbb',
      'b' => 'bbb'
    ];
    $filter = ['a', 'b'];
    $actual = array_filter_keys($array, $filter);
    $expected = ['a' => 'aaa', 'b' => 'bbb'];

    $this->assertEquals($expected, $actual);
  }
}
