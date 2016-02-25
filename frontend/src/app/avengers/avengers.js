(function() {
  "use strict";

  angular.module('clean-code.avengers')
    .controller('AvengersController', AvengersController);

  AvengersController.$inject =['avengers', 'logger'];

  function AvengersController(avengers, logger) {
    var vm = this;
    vm.avengers = [];
    vm.title = 'Avengers';

    _init();

    function _init() {
      return getAvengers().then(function() {
        //do something
        logger.info('Activated Avengers View');
      });
    }

    function getAvengers() {
      return avengers.getAvengers().then(function(data) {
        vm.avengers = data;
        return vm.avengers;
      })
    }
  }
})();