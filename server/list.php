<?php

session_start();

if (!isset($_SESSION['logged_in'])) {
    exit();
}

require_once("db.php");
$stmt = $pdo->prepare('SELECT * FROM documents WHERE owner_id=?');
$stmt->execute(array($_SESSION['id']));
echo json_encode($stmt->fetchAll(PDO::FETCH_OBJ));

?>