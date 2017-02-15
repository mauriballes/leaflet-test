(function () {
    'use strict';

    angular
        .module('app')
        .controller('Maps', MapsController);

    MapsController.$inject = ['$state'];
    
    function MapsController(state) {
        var vm = this;

        vm.message = 'Hello Maps!';
        vm.map = null;

        vm.configMaps = configMaps;

        activate();

        function activate() {
            vm.configMaps();
        }
        
        function configMaps() {
            vm.map = L.map('map').setView([-17.789167, -63.1975], 13);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(vm.map);

            L.marker([-17.789167, -63.1975]).addTo(vm.map)
                .bindPopup('Popup de un punto.<br>Facil de personalizar.')
                .openPopup();
        }
    }
})();