(function () {
  'use strict';

  angular.module('localCast')
  .controller('TeamPageCtrl', TeamPageCtrl);

  TeamPageCtrl.$inject = ['teamsFactory', '$stateParams'];

  function TeamPageCtrl (teamsFactory, $stateParams) {
    var self  = this;
    self.data = {};

    activate();

    function activate () {
      self.data.leagueId = $stateParams.leagueId;
      self.data.teamId   = $stateParams.teamId;
      return teamsFactory.getTeamWithStats(self.data.teamId)
      .then(function (teamTuple) {
        self.data.currentTeamName = teamTuple[0].teamname;
      });
    }

  }
})();
