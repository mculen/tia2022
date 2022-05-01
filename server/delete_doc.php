<?php

session_start();

if (!isset($_SESSION['logged_in']) || empty($_POST["id"])) {
    exit();
}

require_once("config.php");
require_once("db.php");

$stmt = $pdo->prepare('SELECT * FROM documents WHERE id = ?');
$stmt->execute([$_POST['id']]);
$res = $stmt->fetch(PDO::FETCH_OBJ);
$file = $res->full_path;
unlink($file);

$stmt = $pdo->prepare('DELETE FROM documents WHERE id = ?');
$stmt->execute(array($_POST['id']));

echo json_encode((object)array("success" => true, "response" => (object)array()));

?>