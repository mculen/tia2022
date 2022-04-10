<?php

require_once("db.php");

try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS users(
        id serial primary key,
        login varchar(255) unique,
        mail varchar(255) unique,
        password varchar(255) not null,
        name varchar(255),
        registration_time timestamp not null DEFAULT CURRENT_TIMESTAMP
        );");
    print("Created table users.<br>\n");

    $pdo->exec("CREATE TABLE IF NOT EXISTS documents(
        id serial primary key,
        owner_id int not null,
        full_path varchar(255) not null,
        name varchar(255) not null,
        author varchar(255),
        text_content text,
        upload_time timestamp not null DEFAULT CURRENT_TIMESTAMP,
        creation_time timestamp,
        category_id int
        );");
    print("Created table documents.<br>\n");

    $pdo->exec("CREATE TABLE IF NOT EXISTS categories(
        id serial primary key,
        parent_id int,
        name varchar(255) not null
        );");
    print("Created table categories.<br>\n");

    $pdo->exec("CREATE TABLE IF NOT EXISTS tags(
        id serial primary key,
        name varchar(255) not null
        );");
    print("Created table tags.<br>\n");

    $pdo->exec("CREATE TABLE IF NOT EXISTS rel_documents_tags(
        document_id int not null,
        tag_id int not null,
        primary key(document_id, tag_id)
        );");
    print("Created table rel_documents_tags.<br>\n");

    $pdo->exec("CREATE TABLE IF NOT EXISTS permissions(
        document_id int not null,
        user_id int not null,
        permissions int not null,
        primary key(document_id, user_id)
        );");
    print("Created table permissions.<br>\n");

} catch(PDOException $e) {
   echo $e->getMessage();//Remove or change message in production code
}