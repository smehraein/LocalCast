angular.module('localCast.teamsService', [])

.factory('Teams', function ($http) {

  var createTeam = function (name, leagueid) {
    return $http({
      method: 'POST',
      url: '/api/teams',
      data: {
        teamname: name,
        leagueId: leagueid
      }
    });
  };

  var deleteTeam = function (teamid) {
    return $http({
      method: 'DELETE',
      url: '/api/teams/?id='+teamid
    });
  };

  var getTeams = function (leagueid) {
    return $http({
      method: 'GET',
      url: '/api/teams/?lid='+leagueid
    }).then(function (resp) {
      return resp.data;
    });
  };

  var getTeamsWithStats = function (leagueid) {
    return $http({
      method: 'GET',
      url: '/api/teams/?stats=true&lid='+leagueid
    }).then(function (resp) {
      return resp.data;
    });
  };

  var getLeagueName = function (leagueid) {
    return $http({
      method: 'GET',
      url: '/api/leagues/?id='+leagueid
    }).then(function (resp) {
      return resp.data;
    });
  };

  return {
    createTeam: createTeam,
    getTeams: getTeams,
    getTeamsWithStats: getTeamsWithStats,
    getLeagueName: getLeagueName,
    deleteTeam: deleteTeam
  };
});
