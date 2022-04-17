<?php

session_start();
if (!isset($_SESSION['logged_in']) && isset($_POST['login'])) {
    require_once("db.php");
    $stmt = $pdo->prepare('SELECT * FROM users WHERE login=?');
    $stmt->execute(array($_POST['login']));
    $dbuser = $stmt->fetch(PDO::FETCH_OBJ);
    if ($dbuser && password_verify($_POST['password'], $dbuser->password)) {
        $_SESSION['logged_in'] = true;
        $_SESSION['id'] = $dbuser->id;
        $_SESSION['login'] = $dbuser->login;
        $_SESSION['name'] = $dbuser->name;
    } else {
        $err = "Chybné meno alebo heslo";
    }
}

if (isset($_SESSION['logged_in'])) {
    $res = (object)$_SESSION;
} else {
    $res = (object)array('logged_in' => false);
}

$ret = (object)array();
if (isset($err)) {
    $ret->success = false;
    $ret->error = $err;
} else {
    $ret->success = true;
    $ret->response = $res;
}

echo json_encode($ret);

?>