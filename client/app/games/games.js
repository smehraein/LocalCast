angular.module('localCast.games', [])

.controller('GamesController', function ($scope, $location, $stateParams, Games) {
  $scope.teamId = $stateParams.teamId;
  $scope.data = {};
  $scope.data.games = [];

  $scope.init = function () {
    Games.getGames($scope.teamId)
    .then(function (respData) {
        $scope.data.games = respData;
    });
  };

  $scope.init();
});
