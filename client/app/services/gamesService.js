angular.module('localCast.gamesService', [])

.factory('Games', function ($http, $location, $window) {

  var createGame = function (teamId, opponentId, teamScore, opponentScore) {
    return $http({
      method: 'PUT',
      url: '/teams',
      data: {
        teamId:        teamId,
        opponentId:    opponentId,
        teamScore:     teamScore,
        opponentScore: opponentScore
      }
    });
  };

  var deleteGame = function (gameid) {
    return $http({
      method: 'DELETE',
      url: '/teams/?gid='+gameid
    });
  };

  var getGames = function (teamid) {
    return $http({
      method: 'GET',
      url: '/teams/?id='+teamid
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getTeamId = function (teamname) {
    return $http({
      method: 'GET',
      url: '/teams/?tn='+teamname
    })
    .then(
      function (resp) {
        return resp.data;
      });
  };

  var getTeamName = function (teamid) {
    return $http({
      method: 'GET',
      url: '/teams/?tid='+teamid
    })
    .then(
      function (resp) {
        return resp.data;
      });
  };

  return {
    createGame: createGame,
    getTeamId: getTeamId,
    getTeamName: getTeamName,
    getGames: getGames,
    deleteGame: deleteGame
  };
});
