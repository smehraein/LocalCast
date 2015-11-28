(function() {
  'use strict';

  angular.module('localCast')
  .factory('gamesFactory', gamesFactory);

  gamesFactory.$inject = ['$http'];

  function gamesFactory($http) {
    var services = {
      
      createGame        : createGame,
      getGames          : getGames,
      deleteGame        : deleteGame

    };

    return services;

    function createGame (game) {
      return $http({
        method: 'PUT',
        url: '/api/teams',
        data: {
          teamId:        game.teamId,
          opponentId:    game.opponentId,
          teamScore:     game.teamScore,
          opponentScore: game.opponentScore
        }
      });
    }

    function getGames (teamId) { 
      return $http({
        method: 'GET',
        url: '/api/teams/?games=true&id='+teamid
      }).then(function (resp) {
        return resp.data;
      });
    }

    function deleteGame (id) {
      return $http({
        method: 'DELETE',
        url: '/api/teams/?gid='+id
      });
    }

  }
})();
