<?php

session_start();

if (!isset($_SESSION['logged_in'])) {
    http_response_code(403);
    exit;
}

require_once("db.php");

$stmt = $pdo->prepare('SELECT * FROM documents WHERE id = ?');
$stmt->execute([$_GET['id']]);
$res = $stmt->fetch(PDO::FETCH_OBJ);

if ($res->owner_id != $_SESSION['id']) {
    http_response_code(403);
    exit;
}

$file = $res->full_path;
echo $file;
if (file_exists($file)) {
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="'.basename($file).'"' );
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    exit;
}
?>