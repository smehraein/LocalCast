(function() {
  'use strict';

  angular.module('localCast')
  .factory('teamsFactory', teamsFactory);

  teamsFactory.$inject = ['$http'];

  function teamsFactory($http) {
    var services = {
      
      createTeam        : createTeam,
      getTeamWithStats  : getTeamWithStats,
      getTeamsWithStats : getTeamsWithStats,
      getLeagueName     : getLeagueName,
      deleteTeam        : deleteTeam

    };

    return services;

    function createTeam (name, leagueId) {
      return $http({
        method: 'POST',
        url: '/api/teams',
        data: {
          teamname: name,
          leagueId: leagueId
        }
      });
    }

    function getTeamsWithStats (leagueId) { 
      return $http({
        method: 'GET',
        url: '/api/teams/?stats=true&lid='+leagueId
      }).then(function (resp) {
        return resp.data;
      });
    }

    function getTeamWithStats (id) { 
      return $http({
        method: 'GET',
        url: '/api/teams/?stats=true&id='+id
      }).then(function (resp) {
        return resp.data;
      });
    }

    function deleteTeam (id) {
      return $http({
        method: 'DELETE',
        url: '/api/teams/?id='+id
      });
    }

    function getLeagueName (leagueid) {
      return $http({
        method: 'GET',
        url: '/api/leagues/?id='+leagueid
      }).then(function (resp) {
        return resp.data.leaguename;
      });
    }

  }
})();
