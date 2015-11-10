angular.module('localCast.games', [])

.controller('GamesController', function ($scope, $location, $stateParams, Games) {
  $scope.teamId = $stateParams.teamId;
  $scope.data = {};
  $scope.data.games = [];

  $scope.getName = function(id) {
    return Games.getTeamName(id)
    .then(function (respData) {
      return respData.teamname;
    });
  };

  $scope.init = function () {
    Games.getGames($scope.teamId)
    .then(function (respData) {
      for (var i=0; i<respData.length; i++) {
        var game = respData[i];
        $scope.getName(game.team1)
        .then(function(name1) {
          game.team1 = name1;
          return $scope.getName(game.team2);
        })
        .then(function(name2) {
          game.team2 = name2;
          $scope.data.games.push(game);
        });
      }
    });
  };

  $scope.init();
});
