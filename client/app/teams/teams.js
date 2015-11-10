angular.module('localCast.teams', [])

.controller('TeamsController', function ($scope, $location, $stateParams, Teams) {
  $scope.data = {};
  $scope.data.teams = [];
  $scope.leagueId = $stateParams.leagueId;
  $scope.data.currentLeagueName = '';

  $scope.addTeam = function () {
    Teams.createTeam($scope.data.teamname, $scope.leagueId);
  };

  $scope.getTeams = function () {
    Teams.getTeams($scope.leagueId)
      .then(function (respData) {
        $scope.data.teams = respData;
    });
  };

  $scope.init = function () {
    Teams.getLeagueName($scope.leagueId)
      .then(function(respData) {
        $scope.data.currentLeagueName = respData.leaguename;
      });
    $scope.getTeams();
  };

  $scope.init();
});
