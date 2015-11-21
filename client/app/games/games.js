angular.module('localCast.games', [])

.controller('GamesController', function ($scope, $location, $stateParams, $window, Games, Teams) {
  $scope.teamId = $stateParams.teamId;
  $scope.leagueId = $stateParams.leagueId;
  $scope.data = {};
  $scope.data.games = [];
  $scope.data.teams = [];


  $scope.addGame = function() {
    // Games.getTeamId($scope.data.teamname2)
    // .then(function (respData) {
    //   if (!respData[0].id || respData[0].id == $scope.teamId || respData[0].leagueId != $scope.leagueId) {
    //     alert('Invalid Team Name');
    //   }
    //   else {
    //     $scope.updateStandings(+$scope.teamId, +respData[0].id, $scope.data.teamscore1-$scope.data.teamscore2)
    //     .then(function () {
    //       Games.createGame($scope.teamId, respData[0].id, $scope.data.teamscore1, $scope.data.teamscore2);
    //     });
    //   }
    // });
  };


  $scope.removeGame = function(game) {
    return Teams.removeGame(game.id);
  };

  $scope.init = function () {
    Teams.getTeams($scope.leagueId)
    .then(function (teams) {
      $scope.data.teams = teams;
      console.log($scope.data.teams);
    });
  };

  $scope.init();
});
