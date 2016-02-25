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