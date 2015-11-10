angular.module('localCast.games', [])

.controller('GamesController', function ($scope, $location, $stateParams, $window, Games) {
  $scope.teamId = $stateParams.teamId;
  $scope.leagueId = $stateParams.leagueId;
  $scope.data = {};
  $scope.data.games = [];

  $scope.getName = function(id) {
    return Games.getTeamName(id)
    .then(function (respData) {
      return respData.teamname;
    });
  };

  $scope.addGame = function() {
    Games.getTeamId($scope.data.teamname2)
    .then(function (respData) {
      if (!respData[0].id || respData[0].id == $scope.teamId || respData[0].leagueId != $scope.leagueId) {
        alert('Invalid Team Name');
      }
      else {
        $scope.updateStandings(+$scope.teamId, +respData[0].id, $scope.data.teamscore1-$scope.data.teamscore2)
        .then(function () {
          Games.createGame($scope.teamId, respData[0].id, $scope.data.teamscore1, $scope.data.teamscore2);
        });
      }
    });
  };

  $scope.updateStandings = function (team1, team2, diff) {
    if (diff === 0) {
      return Games.addTie(team1)
      .then (function () {
        Games.addTie(team2);
      });
    }
    else if (diff > 0) {
      return Games.addWin(team1)
      .then (function () {
        Games.addLoss(team2);
      });
    }
    else {
      return Games.addLoss(team1)
      .then (function () {
        Games.addWin(team2);
      }); 
    }
  };


  $scope.removeGame = function(game) {
    team1 = game.TeamId;
    team2 = game.team2Id;
    Games.deleteGame(game.id)
    // Can optimize by having teams recalc async
    .then(function () {
      return Games.recalculateTeam(team1)
      .then(function () {
        return Games.recalculateTeam(team2);
      })
      .then(function () {
      $window.location.reload();
      });
    });
  };

  $scope.init = function () {
    Games.getGames($scope.teamId)
    .then(function (respData) {
      $scope.data.games = respData;
      for (var i=0; i<$scope.data.games.length; i++) {
        (function (i) {var game = $scope.data.games[i];
        $scope.getName(game.team2Id)
        .then(function(name) {
          game.team2name = name;
        });
      })(i);
      }
    });
  };

  $scope.init();
});
