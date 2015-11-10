angular.module('localCast.leagues', [])

.controller('LeaguesController', function ($scope, Leagues, Teams) {
  $scope.data = {};
  $scope.data.leagues = [];

  $scope.getLeagues = function () {
    Leagues.getLeagues()
      .then(function (respData) {
        $scope.data.leagues = respData;
    });
  };

  $scope.createLeague = function () {
    Leagues.createLeague($scope.data.leaguename, $scope.data.sport);
  };

  $scope.init = function () {
    $scope.getLeagues();
  };

  $scope.init();

});
