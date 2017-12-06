<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/app.php';

// use \PHPUnit\Framework\TestCase;
// use \PHPUnit\DbUnit\TestCaseTrait;
// use \PHPUnit\DbUnit\DataSet\YamlDataSet;

// require_once "\PHPUnit/Extensions/Database/TestCase.php";
// require_once "\PHPUnit/Extensions/Database/DataSet/YamlDataSet.php";

require_once __DIR__ . '/DatabaseTestBase.php';

// class DatabaseTest extends TestCase
// PHPUnit_TestCase
class DatabaseTest extends DatabaseTestBase
{
  // use TestCaseTrait;

  // /**
  // * @return PHPUnit_Extensions_Database_DB_IDatabaseConnection
  // */
  // public function getConnection()
  // {
  //   $pod = new PDO($GLOBALS['DB_CONNECT']);
  //   return $this->createDefaultDBConnection($pod, $GLOBALS['DB_DBNAME']);
  // }
  // /**
  // * @return PHPUnit_Extensions_Database_DataSet_IDataSet
  // */
  // public function getDataSet()
  // {
  //   // return new YamlDataSet(__DIR__ .'/seed.yml');
  //   return new PHPUnit_Extensions_Database_DataSet_YamlDataSet(__DIR__ .'/seed.yml');
  // }


  public function setUp()
  {
    parent::setUp();
  }

  public function testDB()
  {
    // $rows = $this->getConnection()->createQueryTable('users', 'SELECT * from users');
    // file_put_contents('php://stderr', print_r($rows, TRUE));
    // $data = $this->getConnection()->createDataSet();
    // file_put_contents('php://stderr', print_r($data, TRUE));
    $stmt = $this->getPOD()->query('SELECT * FROM users');
    $users = array();
    foreach ($stmt as $user) {
        $users[] = $user;
    }
    file_put_contents('php://stderr', print_r($stmt, TRUE));
    file_put_contents('php://stderr', print_r($users, TRUE));
    $this->assertEquals(2, $this->getConnection()->getRowCount('users'), "Pre-Condition");

  }


  public function testThreadIndex()
  {
    global $app;
    $res = $app->run('GET', '/threads');
    $this->assertEquals(200, $res->status());
    $this->assertJsonStringEqualsJsonFile(__DIR__ . '/../data/threads.json', $res->content());
  }
}
