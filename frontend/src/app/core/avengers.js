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