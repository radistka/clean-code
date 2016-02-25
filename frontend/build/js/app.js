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
    'ngAnimate', 'ui.router',
    /*
     Our reusable cross app code modules
     */
    'blocks.exception', 'blocks.logger'
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
  "use strict";

  angular.module('blocks.logger', [])
})();
(function() {
  "use strict";

  angular.module('blocks.exception', ['blocks.logger']);
})();
(function() {
  'use strict';

  angular.module('clean-code',
    ['clean-code.core',
      'clean-code.dashboard', 'clean-code.avengers']);
})();

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
(function() {

  angular.module('clean-code.core')
    .factory('avengers', avengers);

  avengers.$inject = ['rest', '$q', 'exception', 'logger'];

  function avengers(rest, $q, exception, logger) {
    return {
      getAvengers: getAvengers,
      getAvengersCount: getAvengersCount,
      getAvengersCast: getAvengersCast
    };

    function getAvengers() {
      var req = {
        method: 'GET',
        url: '/api/maa'
      };
      return rest(req)
        .then(getAvengersComplete)
        .catch(function(error) {
          exception.catcher('XHR Failed for getAvengers', error);
          //show error, add redirection
        });
    }

    function getAvengersComplete(data) {
      return data.data[0].data.results;
    }

    function getAvengersCount() {
      return getAvengersCast()
        .then(function getAvengersCastComplete (data) {
          return data.length;
        })
        .catch(function(error) {
          //hangle error
          exception.catcher('XHR Failed for getAvengersCount')
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
  }

})();
(function() {
  "use strict";

  angular
    .module('clean-code.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('_', _)
})();

'use strict';

(function () {

  angular.module('clean-code.core')
    .factory('rest', rest);

  rest.$inject = ['$http', 'exception'];

  function rest($http, exception) {
    function errorHandler(res) {
      exception.catcher('XHR Failed', res);
    }

    return function (req) {
      req.headers = {};

      var promise = $http(req);
      promise.then(_.noop, errorHandler);
      return promise;
    };
  }
}());
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

(function() {
  "use strict";

  angular
    .module('blocks.logger')
    .factory('logger', logger);

  logger.$inject = ['$log', 'toastr'];

  function logger($log, toastr) {
    return {
      showToasts: true,
      error: error,
      info: info,
      success: success,
      warning: warning,
      log: $log.log
    };

    function error(message, data, title) {
      toastr.error(message, title);
      $log.error('Error: ' + message, data);
    }

    function info(message, data, title) {
      toastr.info(message, title);
      $log.info('Info: ' + message, data);
    }

    function success(message, data, title) {
      toastr.success(message, title);
      $log.info('Success: ' + message, data);
    }

    function warning(message, data, title) {
      toastr.warning(message, title);
      $log.warn('Warning: ' + message, data);
    }
  }
})();
(function() {
  "use strict";

  angular
    .module('blocks.exception')
    .factory('exception', exception);

  exception.$inject = ['logger'];

  function exception(logger) {
    return {
      catcher: catcher
    };

    function catcher(message, reason) {
      return logger.error(message, reason);
    }
  }
})();