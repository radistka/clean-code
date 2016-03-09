(function() {
  'use strict';

  var dashboard = angular.module('clean-code.dashboard', []);

  dashboard.config(function($stateProvider) {
    console.log('dashboard module');
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController as dashboardController'
      })
  })
})();