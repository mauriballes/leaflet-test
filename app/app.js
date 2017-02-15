(function () {
    /*
    * Testing maps
    */

    var map = L.map('map').setView([-17.789167, -63.1975], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-17.789167, -63.1975]).addTo(map)
        .bindPopup('Popup de un punto.<br>Facil de personalizar.')
        .openPopup();

})();