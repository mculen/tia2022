<?php

require_once("config.php");

try {
    $dsn = "pgsql:host=$config[db_host];port=$config[db_port];dbname=$config[db_name];";
    $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING]);

    if (!$pdo) {
        die("Connection to the database unsuccessfull!");
    }
} catch (PDOException $e) {
    die($e->getMessage());
}

?>