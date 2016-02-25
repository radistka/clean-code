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

  angular.module('clean-code',
    ['clean-code.core',
      'clean-code.dashboard', 'clean-code.avengers']);
})();

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
(function() {
  'use strict';

  function DashboardController($q, avengers) {
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
      var promises = [getAvengersCast, getAvengersCount];
      return $q.all(promises).then(function() {
        //data is loaded;
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

  DashboardController.$inject = ['$q', 'avengers'];
  angular
    .module('clean-code.dashboard')
    .controller('DashboardController', DashboardController);
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