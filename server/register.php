<?php

session_start();

if (isset($_SESSION['logged_in'])) {
    exit();
}

require_once("config.php");
require_once("db.php");

$stmt = $pdo->prepare('INSERT INTO users(login, mail, password, name) VALUES (?, ?, ?, ?)');
$stmt->execute(array($_POST['login'], $_POST['mail'], password_hash($_POST['password'], PASSWORD_DEFAULT), $_POST['name']));

mkdir($config['upload_dir'] . '/' . $_POST['login']);

echo json_encode(array());

?>