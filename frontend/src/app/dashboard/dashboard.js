(function() {
  'use strict';

  function DashboardController(avengers) {
    this._avengers = avengers;
    this.news = {
      title: 'Marvel Avengers',
      description: 'Marvel Avengers 2 is now in production!'
    };
    this.avengerCount = 0;
    this.avengers = [];
    this.title = 'Dashboard';

   this. _init();


  }

  DashboardController.prototype._init = function() {
    this._avengers.getAvengersCount().then(function(data) {
      this.avengerCount = data;
    }.bind(this));

    this._avengers.getAvengersCast().then(function(data) {
      this.avengers = data;
    }.bind(this));
  };
  DashboardController.$inject = ['avengers'];
  angular
    .module('clean-code.dashboard')
    .controller('DashboardController', DashboardController);
})();
