(function() {
  'use strict';

  angular
    .module('clean-code.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'avengers', 'logger'];

  function DashboardController($q, avengers, logger) {
    var vm = this;
    vm.news = {
      title: 'Marvel Avengers',
      description: 'Marvel Avengers 2 is now in production!'
    };
    vm.avengerCount = 0;
    vm.avengers = [];
    vm.title = 'Dashboard';

    _init();

    function _init() {
      var promises = [getAvengersCast(), getAvengersCount()];
      return $q.all(promises).then(function() {
        //data is loaded;
        logger.info('Activated Dashboard View');
      })
    }

    function getAvengersCount() {
      return avengers.getAvengersCount().then(function(data) {
        vm.avengerCount = data;
        return vm.avengerCount;
      });
    }

    function getAvengersCast() {
      return avengers.getAvengersCast().then(function(data) {
        vm.avengers = data;
        return vm.avengers;
      });
    }
  }
})();
