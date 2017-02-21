(function (document, window) {
    'use strict';

    angular
        .module('app')
        .controller('Maps', MapsController);

    MapsController.$inject = ['$http', 'GlobalVaribles'];

    function MapsController(http, GlobalVaribles) {
        var vm = this;

        vm.message = 'Hello Maps!';
        vm.map = null;
        vm.users = [];
        vm.userSelect = null;
        vm.tracks = [];
        vm.stopCodeReal = 0;

        vm.configMaps = configMaps;
        vm.getUsers = getUsers;
        vm.errorRequest = errorRequest;
        vm.getTracks = getTracks;
        vm.supportWorkers = window.Worker;

        GlobalVaribles.worker.onmessage = receiveDataWorker;

        activate();

        function activate() {
            vm.configMaps();
            vm.getUsers();
        }

        function configMaps() {
            vm.map = new L.map('map');

            vm.map.setView([-17.783290, -63.182126], 13);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(vm.map);

            // Setup Marker
            GlobalVaribles.marker = new L.marker([-17.783290, -63.182126]);
            GlobalVaribles.marker.addTo(vm.map);
            GlobalVaribles.marker.setOpacity(0.0); // hidden
        }

        function getUsers() {
            // Make request
            var request = {
                method: 'POST',
                url: 'http://localhost:9000/requests.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    method: 'GET_USERS'
                }
            };

            var success = function (data, status, header, config) {
                vm.users = data.data;
            };

            http(request).then(success, vm.errorRequest);
        }

        function errorRequest(err, status, header, config) {
            console.error(err);
        }

        function getLastTrack() {
            // Make request
            var request = {
                method: 'POST',
                url: 'http://localhost:9000/requests.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    method: 'GET_LAST_TRACK',
                    user_id: vm.userSelect.id
                }
            };

            var success = function (data, status, header, config) {
                var res = data.data[0];
                vm.userSelect.last_track_id = res.id;
                vm.userSelect.track = [res.lat, res.lon];
                GlobalVaribles.marker.setOpacity(1.0); // Show Marker
                drawMarker();
                initRealTime();
            };

            http(request).then(success, vm.errorRequest);
        }
        
        function drawMarker() {
            GlobalVaribles.marker.setLatLng(vm.userSelect.track);
        }

        function getTracks(user_id) {
            if (vm.userSelect === null) {
                // Select a new one
                vm.userSelect = {
                    id: user_id,
                    last_track_id: 0
                };
                getLastTrack();
            } else if (vm.userSelect.id === user_id) {
                // Deactivate selected
                vm.userSelect = null;
                stopRealTime();
                GlobalVaribles.marker.setOpacity(0.0);
            } else {
                // Change selected
                stopRealTime();
                vm.userSelect.id = user_id;
                vm.userSelect.last_track_id = 0;
                getLastTrack();
            }
        }

        function receiveDataWorker(e) {
            var data = e.data;
            switch (data.msg) {
                case "initReal":
                    vm.stopCodeReal = data.stopCode;
                    break;
                case "newTrack":
                    vm.userSelect.track = [data.lat, data.lon];
                    vm.userSelect.last_track_id = data.new_id;
                    drawMarker();
                    // Time to call with new track
                    stopRealTime();
                    initRealTime();
                    break;
            }
        }

        function initRealTime() {
            GlobalVaribles.worker.postMessage({
                cmd: 'initReal',
                args: [vm.userSelect.id, vm.userSelect.last_track_id]
            });
        }

        function stopRealTime() {
            GlobalVaribles.worker.postMessage({
                cmd: 'stopReal',
                args: [vm.stopCodeReal]
            });
        }
    }
})(document, window);