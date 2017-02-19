<?php
include "requests.php";
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Index for Managing maps</title>

    <!--Leaflet map library-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css">
    <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>

    <style>
        .content {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
            margin-bottom: 15px;
        }

        #map {
            width: 500px;
            height: 500px;
        }

        body {
            margin-left: 5%;
            margin-right: 5%;
            text-align: center;
        }

        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding-left: 25px;
            padding-right: 25px;
            text-align: center;
        }
    </style>

</head>
<body>
<h1>Backend only for testing!</h1>
<div class="content">
    <div id="map"></div>
</div>
<form action="/" method="post">
    <label for="user_id">User ID</label>
    <input type="text" id="user_id" name="user_id" placeholder="User ID">
    <br><br>
    <label for="lat">Latitud</label>
    <input type="text" id="lat" name="lat" placeholder="Latitud">
    <label for="lon">Longitud</label>
    <input type="text" id="lon" name="lon" placeholder="Longitud">
    <input type="hidden" name="method" value="CREATE_TRACK">
    <input type="submit">
</form>
<div class="content">
<table id="mytable">
    <tr>
        <th>Id</th>
        <th>Latitud</th>
        <th>Longitud</th>
        <th>User Id</th>
    </tr>
    <?php buildTable() ?>
</table>
</div>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
<script type="text/javascript" src="./js/action.js"></script>
</body>
</html>
