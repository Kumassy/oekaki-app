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

  public function testGetPostsForThread()
  {
    $posts = getPostsForThread($this->getPOD(), 2);

    $expected = [
      [
        'id' => 4,
        'thread_id' => 2,
        'image' => 'images/pandaman.jpg',
        'answer' => 'tukaretahito',
        'updated_at' => '2017-12-14 12:00:00',
        'user' => [
          'id' => 1,
          'username' => 'pandaman',
          'avatar' => 'images/pandaman.jpg'
        ]
      ],
      [
        'id' => 5,
        'thread_id' => 2,
        'image' => 'images/kumassy.jpg',
        'answer' => 'danran',
        'updated_at' => '2017-12-16 18:00:00',
        'user' => [
          'id' => 2,
          'username' => 'kumassy',
          'avatar' => 'images/kumassy.jpg'
        ]
      ]
    ];

    $this->assertEquals($expected, $posts);
  }

  public function testGetCommentsForThread()
  {
    $posts = getCommentsForThread($this->getPOD(), 2);

    $expected = [
      [
        'id' => 3,
        'thread_id' => 2,
        'comment' => 'sugbbbbbboi',
        'updated_at' => '2017-12-14 12:00:00',
        'user' => [
          'id' => 3,
          'username' => 'furikake',
          'avatar' => 'images/furikake.jpg'
        ]
      ]
    ];

    $this->assertEquals($expected, $posts);
  }
}
