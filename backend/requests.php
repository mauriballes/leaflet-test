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
            insertNewTrack($_REQUEST['lat'], $_REQUEST['lon'], $_REQUEST['user_id']);
            break;
        case 'GET_USERS':
            echo json_encode(getUsers());
            break;
        case 'GET_LAST_TRACK':
            echo json_encode(getLastTrack($_REQUEST['user_id']));
            break;
    }
}

// Request
function insertNewTrack($lat, $lon, $user_id){
    global $conn;

    $sql = "INSERT INTO maps_test.track(lat, lon, user_id) VALUES(:lat, :lon, :user_id)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':lat' => $lat,
        ':lon' => $lon,
        ':user_id' => $user_id
    ]);
}

function getUsers(){
    global $conn;

    $stmt = $conn->query('SELECT * FROM maps_test.user');
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $results;
}

function getLastTrack($user_id){
    global $conn;

    $stmt = $conn->prepare('SELECT * FROM maps_test.track WHERE user_id=:user_id ORDER BY id DESC LIMIT 1');
    $stmt->execute([
        ':user_id' => $user_id
    ]);
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