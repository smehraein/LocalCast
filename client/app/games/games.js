angular.module('localCast.games', [])

.controller('GamesController', function ($scope, $location, $stateParams, TeamPage) {
  $scope.leagueId = $stateParams.leagueId;
  $scope.teamId = $stateParams.teamId;
  $scope.currentTeamName = '';

  $scope.init = function () {
    TeamPage.getTeamName($scope.teamId)
      .then(function(respData) {
        $scope.currentTeamName = respData[0].teamname;
      });
  };

  $scope.init();
});
