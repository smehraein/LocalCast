angular.module('localCast.members', [])

.controller('MembersController', function ($scope, $location, $stateParams, TeamPage) {
  $scope.leagueId = $stateParams.leagueId;
  $scope.teamId = $stateParams.teamId;
  $scope.currentTeamName = '';

  $scope.init = function () {
  };
});
