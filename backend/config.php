<?php

/*
 * Config file for use de database
 */

$settings = [];

include_once ".env.example.php";
include_once ".env.php";

// Config database Connection

$conn = new PDO("mysql:host=".$settings['DB_HOSTNAME'].";dbname=".$settings['DB_NAME'].";charset=utf8mb4", $settings['DB_USERNAME'], $settings['DB_PASSWORD']);

if (!$conn){
    echo "Error Connection Database!";
    die();
}
