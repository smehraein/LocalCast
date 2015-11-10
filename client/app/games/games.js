angular.module('localCast.games', [])

.controller('GamesController', function ($scope, $location, $stateParams, Games) {
  $scope.teamId = $stateParams.teamId;
  $scope.leagueId = $stateParams.leagueId;
  $scope.data = {};
  $scope.data.games = [];

  $scope.getName = function(id) {
    return Games.getTeamName(id)
    .then(function (respData) {
      return respData.teamname;
    });
  };

  $scope.addGame = function() {
    Games.getTeamId($scope.data.teamname2)
    .then(function (respData) {
      if (!respData[0].id || respData[0].leagueId != $scope.leagueId) {
        alert('Invalid Team Name');
      }
      else {
        Games.createGame($scope.teamId, respData[0].id, $scope.data.teamscore1, $scope.data.teamscore2);
      }
    });
  };


  $scope.removeGame = function(game) {
    Games.deleteGame(game.id);
  };

  $scope.init = function () {
    Games.getGames($scope.teamId)
    .then(function (respData) {
      $scope.data.games = respData;
      for (var i=0; i<$scope.data.games.length; i++) {
        (function (i) {var game = $scope.data.games[i];
        $scope.getName(game.team2Id)
        .then(function(name) {
          game.team2name = name;
        });
      })(i);
      }
    });
  };

  $scope.init();
});
