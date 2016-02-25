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

  angular.module('clean-code')
    .factory('avengers', avengers)
})();