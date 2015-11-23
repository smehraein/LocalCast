angular.module('localCast.members', [])

.controller('MembersController', function ($scope, $stateParams, Members) {
  $scope.teamId = $stateParams.teamId;
  $scope.data = {};


  $scope.getMembers = function () {
    Members.getMembers($scope.teamId)
    .then(function (members) {
      $scope.data.members = members;
    });
  };

  $scope.addMember = function () {
    Members.addMember($scope.data.username, $scope.teamId)
    .then(function () {
      $scope.getMembers();
    });
  };

  $scope.removeMember = function (member) {
    Members.deleteMember(member.id)
    .then(function () {
      $scope.getMembers();
    });
  };

  $scope.init = function () {
    $scope.getMembers();
  };

  $scope.init();
});
