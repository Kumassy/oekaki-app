<?php
$dsn = 'pgsql:host=localhost dbname=j150989k user=j150989k';

try{
    $connection = new PDO($dsn);
    $sql = 'select * from users';

    foreach ($connection->query($sql) as $row) {
        echo $row['login_name'];
    }
}catch (PDOException $e){
    print('Error:'.$e->getMessage());
    die();
}
