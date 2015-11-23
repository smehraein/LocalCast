angular.module('localCast.games', [])

.controller('GamesController', function ($scope, $stateParams, Games, Teams) {
  $scope.teamId = $stateParams.teamId;
  $scope.leagueId = $stateParams.leagueId;
  $scope.data = {};
  $scope.data.games = [];
  $scope.data.teams = [];

  $scope.addGame = function() {
    return Games.createGame($scope.teamId, $scope.data.team2.id, $scope.data.teamscore1, $scope.data.teamscore2)
    .then(function () {
      $scope.getGames();
    });
  };

  $scope.removeGame = function(game) {
    return Games.deleteGame(game.id);
  };

  $scope.getGames = function() {
    return Games.getGames($scope.teamId)
    .then(function (games) {
      $scope.data.games = games;
    });
  };

  $scope.init = function () {
    return Teams.getTeams($scope.leagueId)
    .then(function (teams) {
      $scope.data.teams = teams;
    })
    .then (function () {
      return $scope.getGames();
    });
  };

  $scope.init();
});
