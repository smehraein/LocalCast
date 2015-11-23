angular.module('localCast.teams', [])

.controller('TeamsController', function ($scope, $stateParams, Teams) {
  $scope.data = {};
  $scope.data.teams = [];
  $scope.leagueId = $stateParams.leagueId;
  $scope.data.currentLeagueName = '';

  $scope.addTeam = function () {
    return Teams.createTeam($scope.data.teamname, $scope.leagueId)
    .then(function () {
      $scope.getTeams();
    });
  };

  $scope.removeTeam = function (team) {
    return Teams.deleteTeam(team.id);
  };

  $scope.getTeams = function () {
    return Teams.getTeamsWithStats($scope.leagueId)
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
