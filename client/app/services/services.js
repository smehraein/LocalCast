angular.module('localCast.services', [])

.factory('TeamPage', function ($http, $location, $window) {
  var getTeamName = function (teamid) {
    return $http({
      method: 'GET',
      url: '/teams/?id='+teamid
    })
    .then(
      function (resp) {
        return resp.data;
      });
  };

  return {
    getTeamName: getTeamName
  };
})

.factory('Members', function ($http, $location, $window) {
  var getMembers = function (teamid) {
    return $http({
      method: 'GET',
      url: '/users/?tid='+teamid
    })
    .then(
      function (resp) {
        return resp.data;
      });
  };

  var addMember = function (username, teamid) {
    return $http({
      method: 'POST',
      url: '/users',
      data: {
        username: username,
        teamid: teamid
      }
    }).
    then(function() {
      $window.location.reload();
    });
  };

  var deleteMember = function (userid) {
    return $http({
      method: 'DELETE',
      url: '/users?id='+userid,
    }).
    then(function() {
      $window.location.reload();
    });
  };

  return {
    getMembers: getMembers,
    addMember: addMember,
    deleteMember: deleteMember
  };
});