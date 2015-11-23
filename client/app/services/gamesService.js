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
      url: '/teams/?games=true&id='+teamid
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    createGame: createGame,
    getGames: getGames,
    deleteGame: deleteGame
  };
});
