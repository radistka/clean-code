(function() {
  "use strict";

  var avengers = angular.module('clean-code.avengers', []);

  avengers.config(function($stateProvider) {
    $stateProvider
      .state('avengers', {
        url: '/avengers',
        templateUrl: 'avengers/avengers.html',
        controller: 'AvengersController as avengersController'
      })
  });
})();