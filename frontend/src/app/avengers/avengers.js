(function() {
  "use strict";
  function AvengersController(avengers) {
    this._avengers = avengers;
    this.avengers = [];
    this.title = 'Avengers';


    this._init();
  }

  AvengersController.prototype._init = function() {
    this._avengers.getAvengers().then(function(data) {
      console.log(data);
      this.avengers = data.data[0].data.results;
    }.bind(this))
  };

  AvengersController.$inject =['avengers'];

  angular.module('clean-code')
    .controller('AvengersController', AvengersController)
})();