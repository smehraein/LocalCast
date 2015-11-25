(function () {
  'use strict';

  angular.module('localCast')
  .controller('LeaguesCtrl', LeaguesCtrl);

  LeaguesCtrl.$inject = ['leaguesFactory'];

  function LeaguesCtrl (leaguesFactory) {
    var self  = this;
    self.data = {};

    self.getLeagues   = getLeagues;
    self.removeLeague = removeLeague;
    self.createLeague = createLeague;

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

    function createLeague () {
      return leaguesFactory.createLeague(self.data.leaguename, self.data.description)
      .then(function () {
        getLeagues();
      });
    }
  }
})();
