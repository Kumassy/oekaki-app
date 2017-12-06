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
    return new PHPUnit_Extensions_Database_DataSet_YamlDataSet(__DIR__ .'/seed.yml');
  }

  public function getPOD()
  {
    return self::$pod;
  }
}
