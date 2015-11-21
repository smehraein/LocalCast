angular.module('localCast.teamsService', [])

.factory('Teams', function ($http) {

  var createTeam = function (name, leagueid) {
    return $http({
      method: 'POST',
      url: '/teams',
      data: {
        teamname: name,
        leagueId: leagueid
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
      url: '/teams/?lid='+leagueid
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
});
