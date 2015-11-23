angular.module('localCast.teampage', [])

.controller('TeamPageController', function ($scope, $stateParams, TeamPage) {
  $scope.leagueId = $stateParams.leagueId;
  $scope.teamId = $stateParams.teamId;
  $scope.currentTeamName = '';

  $scope.init = function () {
    TeamPage.getTeam($scope.teamId)
      .then(function(respData) {
        $scope.currentTeamName = respData.teamname;
      });
  };

  $scope.init();
});
