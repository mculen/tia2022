<?php

session_start();

if (isset($_SESSION['logged_in'])) {
    exit();
}

require_once("config.php");
require_once("db.php");

if (empty($_POST['login'])) {
    echo json_encode((object)array("success" => false, "error" => "Prázdne prihlasovacie meno"));
    exit();
}

$regex = "/^[a-zA-Z0-9_.-]+$/";
if (!preg_match($regex, $_POST['login'])) {
    echo json_encode((object)array("success" => false, "error" => "Prihlasovacie meno môže obsahovať iba znaky a-Z, 0-9, -, _ a ."));
    exit();
}

if (empty($_POST['password'])) {
    echo json_encode((object)array("success" => false, "error" => "Prázdne heslo"));
    exit();
}

if (empty($_POST['mail'])) {
    echo json_encode((object)array("success" => false, "error" => "Prázdny mail"));
    exit();
}

if (!filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode((object)array("success" => false, "error" => "Neplatný mail"));
    exit();
}

if (empty($_POST['name'])) {
    echo json_encode((object)array("success" => false, "error" => "Prázdne meno"));
    exit();
}

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
try {
    $stmt = $pdo->prepare('INSERT INTO users(login, mail, password, name) VALUES (?, ?, ?, ?)');
    $stmt->execute(array($_POST['login'], $_POST['mail'], password_hash($_POST['password'], PASSWORD_DEFAULT), $_POST['name']));
} catch (PDOException $e) {
    if ($e->getCode() == "23505") {
        echo json_encode((object)array("success" => false, "error" => "Registrácia s daným prihlasovacím menom/mailom bola už vytvorená"));
        exit();
    }
    throw $e;
}

mkdir($config['upload_dir'] . '/' . $_POST['login']);

echo json_encode((object)array("success" => true, "response" => (object)array()));

?>