(function () {
    'use strict';

    angular
        .module('app')
        .config(config);
    
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state(main);
        $urlRouterProvider.otherwise('/');
    }

    var main = {
        name: 'main',
        url: '/',
        templateUrl: 'app/maps/maps.html',
        controller: 'Maps',
        controllerAs: 'vm'
    }
})();