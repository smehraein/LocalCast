angular.module('localCast.membersService', [])

.factory('Members', function ($http) {
  var getMembers = function (teamid) {
    return $http({
      method: 'GET',
      url: '/api/users/?tid='+teamid
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addMember = function (username, teamid) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: {
        username: username
      }
    }).then(function (user) {
      return $http({
        method: 'PUT',
        url: '/api/users',
        data: {
          userId: user.data.id,
          teamId: teamid
        }
      });
    });
  };

  var deleteMember = function (userid) {
    return $http({
      method: 'DELETE',
      url: '/api/users?id='+userid,
    });
  };

  return {
    getMembers: getMembers,
    addMember: addMember,
    deleteMember: deleteMember
  };
});