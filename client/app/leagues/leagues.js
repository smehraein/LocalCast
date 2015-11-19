angular.module('localCast.leagues', [])

.controller('LeaguesController', function ($scope, Leagues) {
  $scope.data = {};
  $scope.data.leagues = [];

  $scope.getLeagues = function () {
    return Leagues.getLeagues()
    .then(function (respData) {
      $scope.data.leagues = respData;
    });
  };

  $scope.removeLeague = function (league) {
    return Leagues.deleteLeague(league.id)
    .then(function () {
      $scope.getLeagues();
    });
  };  

  $scope.createLeague = function () {
    return Leagues.createLeague($scope.data.leaguename, $scope.data.description)
    .then(function () {
      $scope.getLeagues();
    });
  };

  $scope.init = function () {
    $scope.getLeagues();
  };

  $scope.init();

});
