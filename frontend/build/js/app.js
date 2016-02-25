(function() {
  "use strict";

  var avengers = angular.module('clean-code.avengers', []);

  avengers.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('avengers', {
        url: '/avengers',
        templateUrl: 'avengers/avengers.html',
        controller: 'AvengersController as avengersController'
      })
  });
})();
(function() {
  "use strict";

  angular.module('clean-code.core', [
    /*
     * Angular modules
     */
    'ngAnimate', 'ui.router'
  ])
})();
(function() {
  'use strict';

  var dashboard = angular.module('clean-code.dashboard', []);

  dashboard.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardController as dashboardController'
      })
  })
})();
(function() {
  'use strict';

  angular.module('clean-code',
    ['clean-code.core',
      'clean-code.dashboard', 'clean-code.avengers']);
})();

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
      this.avengers = data.data[0].data.results;
    }.bind(this))
  };

  AvengersController.$inject =['avengers'];

  angular.module('clean-code.avengers')
    .controller('AvengersController', AvengersController)
})();
(function() {

  function avengers(rest, $q) {
    function getAvengers() {
      var req = {
        method: 'GET',
        url: '/api/maa'
      };
      return rest(req);
    }

    function getAvengersCount() {
      return getAvengersCast()
        .then(function getAvengersCastComplete (data) {
          return data.length;
        })
    }

    function getAvengersCast() {
      var cast = [
        {name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man'},
        {name: 'Chris Hemsworth', character: 'Thor'},
        {name: 'Chris Evans', character: 'Steve Rogers / Captain America'},
        {name: 'Mark Ruffalo', character: 'Bruce Banner / The Hulk'},
        {name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow'},
        {name: 'Jeremy Renner', character: 'Clint Barton / Hawkeye'},
        {name: 'Gwyneth Paltrow', character: 'Pepper Potts'},
        {name: 'Samuel L. Jackson', character: 'Nick Fury'},
        {name: 'Paul Bettany', character: 'Jarvis'},
        {name: 'Tom Hiddleston', character: 'Loki'},
        {name: 'Clark Gregg', character: 'Agent Phil Coulson'}
      ];
      return $q.when(cast);
    }

    return {
      getAvengers: getAvengers,
      getAvengersCount: getAvengersCount,
      getAvengersCast: getAvengersCast
    }
  }

  avengers.$inject = ['rest', '$q'];

  angular.module('clean-code.core')
    .factory('avengers', avengers)
})();
'use strict';

(function () {
  function Rest($http) {
    function errorHandler(res) {}

    return function (req) {
      req.headers = {};

      var promise = $http(req);
      promise.then(_.noop, errorHandler);
      return promise;
    };
  }

  Rest.$inject = ['$http'];

  angular.module('clean-code.core')
    .factory('rest', Rest);
}());
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
