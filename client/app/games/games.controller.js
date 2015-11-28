(function () {
  'use strict';

  angular.module('localCast')
  .controller('GamesCtrl', GamesCtrl);

  GamesCtrl.$inject = ['gamesFactory', 'teamsFactory', '$mdDialog', '$stateParams'];

  function GamesCtrl (gamesFactory, teamsFactory, $mdDialog, $stateParams) {
    var self  = this;
    self.data = {};

    self.getGames       = getGames;
    self.removeGame     = removeGame;
    self.addGame        = addGame;
    self.showCreateGame = showCreateGame;
    self.teamFilter     = teamFilter;

    activate();

    function activate () {
      self.data.leagueId = $stateParams.leagueId;
      self.data.teamId   = $stateParams.teamId;
      return teamsFactory.getTeams(self.data.leagueId)
      .then(function (teams) {
        self.data.teams = teams;
        if (teams[0].id != self.data.teamId) {
          self.data.team2 = teams[0];
        }
        else {
          self.data.team2 = teams[1];
        }
        return self.getGames();
      });
    }

    function getGames () {
      return gamesFactory.getGames(self.data.teamId)
      .then(function (games) {
        self.data.games = games;
      });
    }

    function removeGame (game) {
      return gamesFactory.deleteGame(game[0].id)
      .then(function () {
        return getGames();
      });
    }

    function addGame (game) {
      if (isValidGame(game)) {
        return gameFactory.createGame(game)
        .then(function () {
          return getGames();
        });
      }
    }

    function showCreateGame (ev) {
      $mdDialog.show({
        controller: CreateGameCtrl,
        templateUrl: 'app/teams/createGame.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function (game) {
        self.createGame(game);
      }, function() {
      });
      function CreateGameCtrl ($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.create = function(game) {
          $mdDialog.hide(game);
        };
      }
    }

    function teamFilter (team) { 
      return (team.id != self.data.teamId);
    }

    function isValidGame (game) {
      if (!game || !game.teamId || !game.opponentId) {
        return false;
      }
      else if (game.teamId === game.opponentId) {
        return false;
      }
      else {
        return (typeof game.teamId === 'number' && typeof game.opponentId === 'number' && 
                typeof game.teamScore === 'number' && typeof game.opponentScore === 'number');
      }
    }

  }
})();
