onmessage = function (e) {
    // Worker space
    var data = e.data;
    var url = "http://localhost:9000/requests.php";
    var milliseconds = 2000;

    switch (data.cmd) {
        case 'initReal':
            initReal(data.args[0], data.args[1]);
            break;
        case 'stopReal':
            stopReal(data.args[0]);
            break;
    }

    function initReal(user_id, last_track_id) {
        var ajaxRequest = setInterval(getTracks, milliseconds, user_id, last_track_id);
        postMessage({
            msg: 'initReal',
            stopCode: ajaxRequest
        });
    }

    function stopReal(stopCode) {
        clearInterval(stopCode);
        postMessage({
            msg: 'Stop RealTime'
        });
    }

    function getTracks(user_id, last_track_id) {
        var xhttp = new XMLHttpRequest();

        xhttp.open('POST', url, true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        var params = "method=GET_LAST_TRACK&user_id=" + String(user_id);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) { // Response ready
                if (this.status == 200) { // Good
                    var arrayResponse = JSON.parse(this.responseText);
                    var lastID = arrayResponse[0].id;
                    if (lastID != last_track_id) {
                        postMessage({
                            msg: 'newTrack',
                            lat: arrayResponse[0].lat,
                            lon: arrayResponse[0].lon,
                            new_id: lastID
                        });
                    }
                } else { // Bad
                    console.error(this.responseText);
                }
            }
        };

        xhttp.send(params);
    }
};