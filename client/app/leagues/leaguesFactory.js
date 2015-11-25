(function() {
  'use strict';

  angular.module('localCast')
  .factory('leaguesFactory', leaguesFactory);

  leaguesFactory.$inject = ['$http'];

  function leaguesFactory($http) {
    var services = {
      
      createLeague  : createLeague,
      getLeagues    : getLeagues,
      deleteLeague  : deleteLeague

    };

    return services;

    function createLeague (name, description) {
      return $http({
        method: 'POST',
        url: '/api/leagues',
        data: {
          leaguename: name,
          description: description
        }
      });
    }

    function getLeagues () { 
      return $http({
        method: 'GET',
        url: '/api/leagues'
      }).then(function (resp) {
        return resp.data;
      });
    }

    function deleteLeague (id) {
      return $http({
        method: 'DELETE',
        url: '/api/leagues/?id='+id
      });
    }
  }

})();
