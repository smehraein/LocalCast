angular.module('localCast.teams', [])

.controller('TeamsController', function ($scope, $location, $stateParams, $window, Teams, Games) {
  $scope.data = {};
  $scope.data.teams = [];
  $scope.leagueId = $stateParams.leagueId;
  $scope.data.currentLeagueName = '';

  $scope.addTeam = function () {
    Teams.createTeam($scope.data.teamname, $scope.leagueId);
  };

  $scope.removeTeam = function (team) {
    return Teams.deleteTeam(team.id)
    .then(function () {
      return $scope.getTeams($scope.leagueId);
    })
    .then(function () {
      var countdown = $scope.data.teams.length;
      for (var i=0; i<$scope.data.teams.length; i++) {
        (function(i){
          return Games.recalculateTeam($scope.data.teams[i].id)
          .then(function () {
            countdown--;
            if (countdown === 0) {
              $window.location.reload(); 
            }
          });
        })(i);
      }
    });
  };

  $scope.getTeams = function () {
    return Teams.getTeams($scope.leagueId)
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
