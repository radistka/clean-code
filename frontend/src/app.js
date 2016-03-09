(function() {
  'use strict';

  var app = angular.module('clean-code',
    ['clean-code.core',
      'clean-code.dashboard', 'clean-code.avengers', 'clean-code.layout']);

  app.config(function($urlRouterProvider) {
    console.log('app');
    $urlRouterProvider.otherwise('/');
  });
  app.run(function($state){});//fixed issue with ui-view inside ng-include
})();
