angular.module('localCast.teamsService', [])

.factory('Teams', function ($http, $location, $window) {

  var createTeam = function (name, leagueid) {
    return $http({
      method: 'POST',
      url: '/teams',
      data: {
        teamname: name,
        leagueid: leagueid
      }
    });
  };

  var deleteTeam = function (teamid) {
    return $http({
      method: 'DELETE',
      url: '/teams/?id='+teamid
    });
  };

  var getTeams = function (leagueid) {
    return $http({
      method: 'GET',
      url: '/teams/?id='+leagueid
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getLeagueName = function (leagueid) {
    return $http({
      method: 'GET',
      url: '/leagues/?id='+leagueid
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    createTeam: createTeam,
    getTeams: getTeams,
    getLeagueName: getLeagueName,
    deleteTeam: deleteTeam
  };
})