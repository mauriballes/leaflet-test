<?php
/**
 * File to receive requests
 */

header("Access-Control-Allow-Origin: *");

$conn = null;

include "config.php";

// Router
if(isset($_REQUEST['method'])){
    switch ($_REQUEST['method']){
        case 'CREATE_TRACK':
            insertNewTrack();
            break;
        case 'GET_USERS':
            echo json_encode(getUsers());
            break;
    }
}

// Request
function insertNewTrack(){
    global $conn;

    $sql = "INSERT INTO maps_test.track(lat, lon, user_id) VALUES(:lat, :lon, :user_id)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':lat' => $_POST['lat'],
        ':lon' => $_POST['lon'],
        ':user_id' => $_POST['user_id']
    ]);
}

function getUsers(){
    global $conn;

    $stmt = $conn->query('SELECT * FROM maps_test.user');
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $results;
}

// Utils
function getAllTracks(){
    global $conn;

    $stmt = $conn->query('SELECT * FROM maps_test.track');
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $results;
}

function buildTable(){
    // This function build a table with track from getAllTracks()
    $tracks = getAllTracks();
    $table = '';

    foreach ($tracks as $track){
        $table .= '<tr>';
        foreach ($track as $attr => $value){
            $table .= '<td>' . $value . '</td>';
        }
        $table .= '</tr>';
    }
    echo $table;
}

// Debug
function dd($var){
    var_dump($var);
}