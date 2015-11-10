angular.module('localCast.teams', [])

.controller('TeamsController', function ($scope, $location, $stateParams, Teams) {
  $scope.data = {};
  $scope.data.teams = [];
  $scope.leagueId = $stateParams.leagueId;
  $scope.data.currentLeagueName = '';

  $scope.addTeam = function () {
    Teams.createTeam($scope.data.teamname);
  };

  $scope.selectTeam = function (name) {
    return;
  };

  $scope.getTeams = function () {
    Teams.getTeams()
      .then(function (respData) {
        $scope.data.teams = respData;
    });
  };

  $scope.init = function () {
    console.log("WUT");
    $scope.getTeams();
  };

  $scope.init();
});
