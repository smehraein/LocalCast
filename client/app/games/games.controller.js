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
      self.data.leagueId = +$stateParams.leagueId;
      self.data.teamId   = +$stateParams.teamId;
      return teamsFactory.getTeams(self.data.leagueId)
      .then(function (teams) {
        self.data.teams = teams;
        return self.getGames();
      });
    }

    function getGames () {
      return gamesFactory.getGames(self.data.teamId)
      .then(function (games) {
        console.log(games);
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
        return gamesFactory.createGame(game)
        .then(function () {
          return getGames();
        });
      }
    }

    function showCreateGame (ev) {
      $mdDialog.show({
        controller: CreateGameCtrl,
        templateUrl: 'app/games/createGame.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          teams      : self.data.teams,
          teamFilter : teamFilter
        }
      })
      .then(function (game) {
        self.addGame(game);
      }, function() {
      });
      function CreateGameCtrl ($scope, $mdDialog, teams, teamFilter) {
        $scope.teams = teams;
        $scope.teamFilter = teamFilter;
        $scope.game = {};
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.create = function(game) {
          game.teamId = self.data.teamId;
          game.opponentId = +game.opponentId;
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
