<?php
// namespace MyApp;
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/app.php';

use \PHPUnit\Framework\TestCase;
use \PHPUnit\DbUnit\TestCaseTrait;
use \PHPUnit\DbUnit\DataSet\YamlDataSet;

// require_once "\PHPUnit/Extensions/Database/TestCase.php";
// require_once "\PHPUnit/Extensions/Database/DataSet/YamlDataSet.php";

// class DatabaseTest extends TestCase
class DatabaseTestBase extends PHPUnit_Extensions_Database_TestCase
{
  // use TestCaseTrait;

  public function setUp()
  {
    parent::setUp();
    // $stmt = self::$pod->prepare('SELECT SETVAL("comments_id_seq", 1000)');
    // $stmt->execute();
    // $stmt = self::$pod->prepare('SELECT SETVAL("comments_thread_id_seq", 1000)');
    // $stmt->execute();
    // $stmt = self::$pod->prepare('SELECT SETVAL("comments_user_id_seq", 1000)');
    // $stmt->execute();
    // $stmt = self::$pod->prepare('SELECT SETVAL("images_id_seq", 1000)');
    // $stmt->execute();
    // $stmt = self::$pod->prepare('SELECT SETVAL("posts_id_seq", 1000)');
    // $stmt->execute();
    // $stmt = self::$pod->prepare('SELECT SETVAL("posts_image_id_seq", 1000)');
    // $stmt->execute();
    // $stmt = self::$pod->prepare('SELECT SETVAL("posts_thread_id_seq", 1000)');
    // $stmt->execute();
    // $stmt = self::$pod->prepare('SELECT SETVAL("posts_user_id_seq", 1000)');
    // $stmt->execute();
    // $stmt = self::$pod->prepare('SELECT SETVAL("threads_id_seq", 1000)');
    // $stmt->execute();
    // $stmt = self::$pod->prepare('SELECT SETVAL("users_id_seq", 1000)');
    // $stmt->execute();
    // $stmt = self::$pod->prepare('SELECT SETVAL("users_image_id_seq", 1000)');
    // $stmt->execute();
  }

  /**
  * @return PHPUnit_Extensions_Database_DB_IDatabaseConnection
  */
  static private $pod = null;
  public function getConnection()
  {
    self::$pod = new PDO($GLOBALS['DB_CONNECT']);
    return $this->createDefaultDBConnection(self::$pod, $GLOBALS['DB_DBNAME']);
  }
  /**
  * @return PHPUnit_Extensions_Database_DataSet_IDataSet
  */
  public function getDataSet()
  {
    // return new YamlDataSet(__DIR__ .'/seed.yml');

    $dataSet = new PHPUnit_Extensions_Database_DataSet_YamlDataSet(__DIR__ .'/../db/seed.yml');
    return $dataSet;
  }

  protected function getSetUpOperation()
  {
      // 引数にtrueを渡すように上書き
    return \PHPUnit_Extensions_Database_Operation_Factory::CLEAN_INSERT(true);
  }


  public function getPOD()
  {
    return self::$pod;
  }
}
