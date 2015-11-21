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
})

.factory('Games', function ($http, $location, $window) {

  var createGame = function (team1, team2, team1score, team2score) {
    return $http({
      method: 'POST',
      url: '/games',
      data: {
        team1id: team1,
        team2id: team2,
        team1score: team1score,
        team2score: team2score
      }
    }).
    then(function() {
      $window.location.reload();
    });
  };

  var deleteGame = function (gameid) {
    return $http({
      method: 'DELETE',
      url: '/teams/?gid='+gameid
    })
    .then(function () {
      return;
    });
  };

  var getGames = function (teamid) {
    return $http({
      method: 'GET',
      url: '/games/?id='+teamid
    })
    .then(
      function (resp) {
        return resp.data;
      });
  };

  var getTeamId = function (teamname) {
    return $http({
      method: 'GET',
      url: '/teams/?tn='+teamname
    })
    .then(
      function (resp) {
        return resp.data;
      });
  };

  var getTeamName = function (teamid) {
    return $http({
      method: 'GET',
      url: '/teams/?tid='+teamid
    })
    .then(
      function (resp) {
        return resp.data;
      });
  };

  return {
    createGame: createGame,
    getTeamId: getTeamId,
    getTeamName: getTeamName,
    getGames: getGames,
    deleteGame: deleteGame
  };
});
