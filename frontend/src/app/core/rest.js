'use strict';

(function () {

  angular.module('clean-code.core')
    .factory('rest', rest);

  rest.$inject = ['$http'];

  function rest($http) {
    function errorHandler(res) {}

    return function (req) {
      req.headers = {};

      var promise = $http(req);
      promise.then(_.noop, errorHandler);
      return promise;
    };
  }
}());