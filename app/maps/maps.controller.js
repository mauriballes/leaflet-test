(function () {
    'use strict';

    angular
        .module('app')
        .controller('Maps', MapsController);

    MapsController.$inject = ['$http'];

    function MapsController(http) {
        var vm = this;

        vm.message = 'Hello Maps!';
        vm.map = null;
        vm.users = [];

        vm.configMaps = configMaps;
        vm.getUsers = getUsers;
        vm.errorRequest = errorRequest;

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
    }
})();