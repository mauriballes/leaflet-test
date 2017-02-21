(function (window) {
    'use strict';

    angular
        .module('app')
        .factory('GlobalVaribles', GlobalVaribles);

    GlobalVaribles.$inject = [];

    function GlobalVaribles() {
        // Worker
        var myWorker = null;

        if(window.Worker)
            myWorker = new Worker('./app/worker/realtime.js');

        return {
            marker: null,
            worker: myWorker,
            line: null
        }
    }
})(window);