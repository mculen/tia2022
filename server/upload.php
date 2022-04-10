<?php

session_start();

if (!isset($_SESSION['logged_in'])) {
    http_response_code(403);
    exit;
}

require_once("config.php");
require_once("db.php");

$target_file = $config['upload_dir'] . '/' . $_SESSION['login'] . '/' . basename($_FILES["file"]["name"]);

if (!file_exists($target_file)) {
    move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
    $stmt = $pdo->prepare('INSERT INTO documents(owner_id, full_path, name) VALUES (?, ?, ?)');
    $stmt->execute(array($_SESSION['id'], $target_file, $_POST['name']));
}

echo json_encode(array());

?>
