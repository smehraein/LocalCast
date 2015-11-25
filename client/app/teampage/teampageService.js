angular.module('localCast.teampageService', [])

.factory('TeamPage', function ($http) {
  var getTeam = function (teamid) {
    return $http({
      method: 'GET',
      url: '/api/teams/?id='+teamid
    }).then(function (resp) {
      return resp.data;
    });
  };
  
  return {
    getTeam: getTeam
  };
});
