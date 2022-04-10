<?php

session_start();

if (isset($_SESSION['logged_in'])) {
    unset($_SESSION['logged_in']);
    unset($_SESSION['id']);
    unset($_SESSION['login']);
    unset($_SESSION['name']);
}

?>