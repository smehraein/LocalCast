angular.module('localCast.teams', [])

.controller('TeamsController', function ($scope, $location, Teams) {
  $scope.data = {};
  $scope.data.teams = [];
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
    $scope.data.currentLeagueName = Teams.getLeagueName();
    $scope.getTeams();
  };

  $scope.init();
});
