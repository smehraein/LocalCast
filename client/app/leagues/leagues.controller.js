(function () {
  'use strict';

  angular.module('localCast')
  .controller('LeaguesCtrl', LeaguesCtrl);

  LeaguesCtrl.$inject = ['leaguesFactory', '$mdDialog'];

  function LeaguesCtrl (leaguesFactory, $mdDialog) {
    var self  = this;
    self.data = {};

    self.getLeagues       = getLeagues;
    self.removeLeague     = removeLeague;
    self.createLeague     = createLeague;
    self.showCreateLeague = showCreateLeague;

    activate();

    function activate () {
      getLeagues();
    }

    function getLeagues () {
      return leaguesFactory.getLeagues()
      .then(function (respData) {
        self.data.leagues = respData;
      });
    }

    function removeLeague (league) {
      return leaguesFactory.deleteLeague(league.id)
      .then(function () {
        getLeagues();
      });
    }

    function createLeague (leagueTuple) {
      if (isValidLeague(leagueTuple)) {
        return leaguesFactory.createLeague(leagueTuple[0], leagueTuple[1])
        .then(function () {
          return getLeagues();
        });
      }
    }

    function showCreateLeague (ev) {
      $mdDialog.show({
        controller: CreateLeagueCtrl,
        templateUrl: 'app/leagues/createLeague.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function (leagueTuple) {
        return self.createLeague(leagueTuple);
      }, function() {
      });
      function CreateLeagueCtrl ($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.create = function(leagueTuple) {
          $mdDialog.hide(leagueTuple);
        };
      }
    }

    function isValidLeague (leagueTuple) {
      if (!leagueTuple) {
        return false;
      }
      else {
        return (typeof leagueTuple[0] === "string" && typeof leagueTuple[1] === "string");
      }
    }

  }
})();
