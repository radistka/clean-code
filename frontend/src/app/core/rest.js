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