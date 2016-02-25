(function() {
  "use strict";
  function AvengersController(avengers) {
    var vm = this;
    vm.avengers = [];
    vm.title = 'Avengers';

    _init();

    function _init() {
      return getAvengers().then(function() {
        //do something
      });
    }

    function getAvengers() {
      avengers.getAvengers().then(function(data) {
        vm.avengers = data.data[0].data.results;
        return vm.avengers;
      })
    }
  }

  AvengersController.$inject =['avengers'];

  angular.module('clean-code.avengers')
    .controller('AvengersController', AvengersController)
})();