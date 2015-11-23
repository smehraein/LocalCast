angular.module('localCast.leaguesService', [])

.factory('Leagues', function ($http) {
  var createLeague = function (name, description) {
    return $http({
      method: 'POST',
      url: '/leagues',
      data: {
        leaguename: name,
        description: description
      }
    });
  };

  var getLeagues = function () { 
    return $http({
      method: 'GET',
      url: '/leagues'
    }).then(function (resp) {
      return resp.data;
    });
  };

  var deleteLeague = function (id) {
    return $http({
      method: 'DELETE',
      url: '/leagues/?id='+id
    });
  };

  return {
    createLeague: createLeague,
    getLeagues: getLeagues,
    deleteLeague: deleteLeague
  };
});
