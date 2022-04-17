<?php

session_start();

if (!isset($_SESSION['logged_in'])) {
    http_response_code(403);
    exit;
}

require_once("config.php");
require_once("db.php");

if (empty($_POST['name'])) {
    echo json_encode((object)array("success" => false, "error" => "Prázdny názov súboru"));
    exit();
}

if (empty($_FILES['file']['tmp_name'])) {
    echo json_encode((object)array("success" => false, "error" => "Žiadny súbor nebol vybratý"));
    exit();
}

switch ($_FILES['file']['error']) {
    case UPLOAD_ERR_OK:
        break;
    
    case UPLOAD_ERR_INI_SIZE:
    case UPLOAD_ERR_FORM_SIZE:
        echo json_encode((object)array("success" => false, "error" => "Prekročená maximálna veľkosť súboru"));
        exit();
    
    case UPLOAD_ERR_PARTIAL:
    case UPLOAD_ERR_NO_FILE:
    case UPLOAD_ERR_NO_TMP_DIR:
    case UPLOAD_ERR_CANT_WRITE:
    case UPLOAD_ERR_EXTENSION:
        echo json_encode((object)array("success" => false, "error" => "Nahrávanie súboru zlyhalo"));
        exit();
}

$target_file = $config['upload_dir'] . '/' . $_SESSION['login'] . '/' . basename($_FILES["file"]["name"]);

if (file_exists($target_file)) {
    echo json_encode((object)array("success" => false, "error" => "Súbor už existuje"));
    exit();
}

$extension = pathinfo($target_file, PATHINFO_EXTENSION);
if (!isset($extension) || $extension != "pdf") {
    echo json_encode((object)array("success" => false, "error" => "Iba súbory PDF sú podporované"));
    exit();
}

if (!file_exists($target_file)) {
    move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
    $stmt = $pdo->prepare('INSERT INTO documents(owner_id, full_path, name) VALUES (?, ?, ?)');
    $stmt->execute(array($_SESSION['id'], $target_file, $_POST['name']));
} else {

}

echo json_encode((object)array("success" => true, "response" => (object)array()));

?>