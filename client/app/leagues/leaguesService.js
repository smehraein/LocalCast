angular.module('localCast.leaguesService', [])

.factory('Leagues', function ($http) {
  var createLeague = function (name, description) {
    return $http({
      method: 'POST',
      url: '/api/leagues',
      data: {
        leaguename: name,
        description: description
      }
    });
  };

  var getLeagues = function () { 
    return $http({
      method: 'GET',
      url: '/api/leagues'
    }).then(function (resp) {
      return resp.data;
    });
  };

  var deleteLeague = function (id) {
    return $http({
      method: 'DELETE',
      url: '/api/leagues/?id='+id
    });
  };

  return {
    createLeague: createLeague,
    getLeagues: getLeagues,
    deleteLeague: deleteLeague
  };
});
