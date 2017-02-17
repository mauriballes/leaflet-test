(function (document) {
    // Variables
    var map = null;

    // Config
    activate();

    // methods
    function activate() {
        map = new L.Map('map');

        map.setView([-17.783290, -63.182126], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Config Event
        map.on('click', onMapClick);
    }

    // events
    function onMapClick(e){
        // Show popup
        L.popup()
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);

        // Set inputs
        $("#lat").val(e.latlng.lat);
        $("#lon").val(e.latlng.lng);
    }
})(document);
