(function() {
  'use strict';

  angular.module('localCast')
  .factory('membersFactory', membersFactory);

  membersFactory.$inject = ['$http'];

  function membersFactory($http) {
    var services = {
      
      addMember    : addMember,
      getMembers   : getMembers,
      deleteMember : deleteMember

    };

    return services;

    // To refactor once users are their own thing (not just created by/for teams)
    function addMember (name, teamId) {
      return $http({
        method: 'POST',
        url: '/api/users',
        data: {
          username: name
        }
      }).then(function (user) {
        return $http({
          method: 'PUT',
          url: '/api/users',
          data: {
            userId: user.data.id,
            teamId: teamId
          }
        });
      });
    }

    function getMembers (teamid) { 
      return $http({
        method: 'GET',
        url: '/api/users/?tid='+teamid
      }).then(function (resp) {
        return resp.data;
      });
    }

    function deleteMember (id) {
      return $http({
        method: 'DELETE',
        url: '/api/users?id='+id,
      });
    }

  }

})();
