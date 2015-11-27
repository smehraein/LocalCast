(function () {
  'use strict';

  angular.module('localCast')
  .controller('TeamsCtrl', TeamsCtrl);

  TeamsCtrl.$inject = ['teamsFactory', '$mdDialog', '$stateParams'];

  function TeamsCtrl (teamsFactory, $mdDialog, $stateParams) {
    var self  = this;
    self.data = {};

    self.getTeams       = getTeams;
    self.removeTeam     = removeTeam;
    self.createTeam     = createTeam;
    self.showCreateTeam = showCreateTeam;

    activate();

    function activate () {
      self.data.leagueId = $stateParams.leagueId;
      return teamsFactory.getLeagueName(self.data.leagueId)
      .then(function (name) {
        self.data.currentLeagueName = name;
        return self.getTeams();
      });
    }

    function getTeams () {
      return teamsFactory.getTeamsWithStats(self.data.leagueId)
      .then(function (teams) {
        self.data.teams = teams;
      });
    }

    function removeTeam (team) {
      return teamsFactory.deleteTeam(team.id)
      .then(function () {
        return getTeams();
      });
    }

    function createTeam (teamName) {
      if (isValidTeam(teamName)) {
        return teamsFactory.createTeam(teamName)
        .then(function () {
          return getTeams();
        });
      }
    }

    function showCreateTeam (ev) {
      $mdDialog.show({
        controller: CreateTeamCtrl,
        templateUrl: 'app/leagues/createTeam.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function (teamName) {
        self.createTeam(teamName);
      }, function() {
      });
      function CreateLeagueCtrl ($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.create = function(teamName) {
          $mdDialog.hide(teamName);
        };
      }
    }

    function isValidTeam (teamName) {
      if (!teamName) {
        return false;
      }
      else {
        return (typeof teamName === "string");
      }
    }

  }
})();
