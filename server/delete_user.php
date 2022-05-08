<?php

session_start();

if (isset($_SESSION['logged_in'])) {
    exit();
}

require_once("config.php");
require_once("db.php");

$stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
$stmt->execute(array($_SESSION['id']));

function rrmdir($dir) { 
    if (is_dir($dir)) { 
      $objects = scandir($dir);
      foreach ($objects as $object) { 
        if ($object != "." && $object != "..") { 
          if (is_dir($dir . "/" . $object) && !is_link($dir . "/" . $object))
            rrmdir($dir . "/" . $object);
          else
            unlink($dir . "/" . $object); 
        } 
      }
      rmdir($dir); 
    } 
  }

rrmdir($config['upload_dir'] . '/' . $_POST['login']);

session_destroy();

echo json_encode((object)array("success" => true, "response" => (object)array()));

?>