<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/app.php';

class DatabaseTest extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
    }


    public function testThreadIndex()
    {
        global $app;
        $res = $app->run('GET', '/threads');
        $this->assertEquals(200, $res->status());
        $this->assertJsonStringEqualsJsonFile(__DIR__ . '/../data/threads.json', $res->content());
    }
}
