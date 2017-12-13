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

  public function testNormalizeHiraganaString()
  {
    $this->assertEquals('おはよう', normalizeHiraganaString('おはよう'));
    $this->assertEquals('かつこう', normalizeHiraganaString('がっこう'));
    $this->assertEquals('ようしよ', normalizeHiraganaString('ょぅじょ'));
  }

  public function testIsShiritoriSuccess()
  {
    $this->assertEquals(TRUE, isShiritoriSuccess('おはよう', 'うま'));
    $this->assertEquals(TRUE, isShiritoriSuccess('あぅ', 'ううう'));
    $this->assertEquals(TRUE, isShiritoriSuccess('ぜんぜんぜんぜ', 'せま'));
    $this->assertEquals(TRUE, isShiritoriSuccess('かい', 'ぃぃう'));
    $this->assertEquals(FALSE, isShiritoriSuccess('がんば', 'ああ'));
    $this->assertEquals(FALSE, isShiritoriSuccess('がんば', 'ばん'));
    $this->assertEquals(TRUE, isShiritoriSuccess('っ', 'づ'));
    $this->assertEquals(FALSE, isShiritoriSuccess('っ', 'づん'));

  }
}
