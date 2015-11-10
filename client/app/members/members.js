angular.module('localCast.members', [])

.controller('MembersController', function ($scope, $location, $stateParams, Members) {
  $scope.teamId = $stateParams.teamId;
  $scope.data = {};


  $scope.getMembers = function () {
    Members.getMembers($scope.teamId)
    .then(function (members) {
      $scope.data.members = members;
    });
  };

  $scope.addMember = function () {
    Members.addMember($scope.data.username, $scope.teamId);
  };

  $scope.removeMember = function (member) {
    Members.deleteMember(member.id);
  };

  $scope.init = function () {
    $scope.getMembers();
  };

  $scope.init();
});
