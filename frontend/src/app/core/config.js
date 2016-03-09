(function() {
  'use strict';

  var core = angular.module('clean-code.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appTitle: 'Angular Modular Demo',
    version: '1.0.0'
  };

  core.value('config', config);
})();