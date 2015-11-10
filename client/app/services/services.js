angular.module('localCast.services', [])

.factory('Leagues', function ($http, $location, $window) {
  var createLeague = function (name, sport) {
    return $http({
      method: 'POST',
      url: '/leagues',
      data: {
        leaguename: name,
        sport: sport
      }
    }).
    then(function() {
      $window.location.reload();
    });
  };

  var getLeagues = function () { 
    return $http({
      method: 'GET',
      url: '/leagues'
    })
    .then(
      function (resp) {
        return resp.data;
      });
  };

  var deleteLeague = function (id, teamsdata) {
    if (teamsdata.length === 0) {
      return $http({
        method: 'DELETE',
        url: '/leagues/?id='+id
      })
      .then (function () {
        $window.location.reload();
      });
    }
    else {
      var countdown = teamsdata.length;
        for (var i=0; i<teamsdata.length; i++) {
        (function (i){
          deleteLeagueTeam(teamsdata[i].id)
          .then(function () {
            countdown--;
            if (countdown === 0) {
              return $http({
                method: 'DELETE',
                url: '/leagues/?id='+id
              })
              .then (function () {
                $window.location.reload();
              });
            }
          });
        })(i);
      }
    }
  };

  var deleteLeagueTeam = function (teamid) {
    return $http({
      method: 'DELETE',
      url: '/users/?tid='+teamid
    })
    .then(function () {
      return $http({
        method: 'DELETE',
        url: '/games/?tid='+teamid
      });  
    })
    .then(function () {
      return $http({
        method: 'DELETE',
        url: '/teams/?id='+teamid
      });  
    });
  };

  return {
    createLeague: createLeague,
    getLeagues: getLeagues,
    deleteLeague: deleteLeague
  };
})
.factory('Teams', function ($http, $location, $window) {

  var createTeam = function (name, leagueid) {
    return $http({
      method: 'POST',
      url: '/teams',
      data: {
        teamname: name,
        leagueid: leagueid
      }
    }).
    then(function() {
      $window.location.reload();
    });
  };

  var deleteTeam = function (teamid) {
    return $http({
      method: 'DELETE',
      url: '/users/?tid='+teamid
    })
    .then(function () {
      return $http({
        method: 'DELETE',
        url: '/games/?tid='+teamid
      });  
    })
    .then(function () {
      return $http({
        method: 'DELETE',
        url: '/teams/?id='+teamid
      });  
    })
    .then(function() {
      $window.location.reload();
    });
  };

  var getTeams = function (leagueid) {
    return $http({
      method: 'GET',
      url: '/teams/?id='+leagueid
    })
    .then(
      function (resp) {
        return resp.data;
      });
  };

  var getLeagueName = function (leagueid) {
    return $http({
      method: 'GET',
      url: '/leagues/?id='+leagueid
    })
    .then(
      function (resp) {
        return resp.data;
      });
  };

  return {
    createTeam: createTeam,
    getTeams: getTeams,
    getLeagueName: getLeagueName,
    deleteTeam: deleteTeam
  };
})

.factory('TeamPage', function ($http, $location, $window) {
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
      url: '/games/?id='+gameid
    })
    .then(function () {
      return;
    });
  };

  var recalculateTeam = function (teamid) {
    return resetTeam(teamid)
    .then(function () {
      getGames(teamid)
      .then(function (gamesData) {
        var countdown = gamesData.length;
        for (var i=0; i<gamesData.length; i++) {
          (function(i){
            var game = gamesData[i];
            //Tie
            if (game.team1score === game.team2score) {
              addTie(teamid);
            }
            // Win
            else if ((game.TeamId === teamid && game.team1score > game.team2score) || (game.team2Id === teamid && game.team2score > game.team1score)) {
              addWin(teamid);
            }
            //Loss
            else {
              addLoss(teamid);
            }
            countdown--;
            if (countdown === 0) return;
          })(i);
        }
      });
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

  var addWin = function (teamid) {
    return $http({
      method: 'PUT',
      url: '/teams',
      data: {
        teamid: teamid,
        outcome: 'win'
      }
    });
  };

  var addLoss = function (teamid) {
    return $http({
      method: 'PUT',
      url: '/teams',
      data: {
        teamid: teamid,
        outcome: 'loss'
      }
    });
  };

  var addTie = function (teamid) {
    return $http({
      method: 'PUT',
      url: '/teams',
      data: {
        teamid: teamid,
        outcome: 'tie'
      }
    });
  };

  var resetTeam = function (teamid) {
    return $http({
      method: 'PUT',
      url: '/teams',
      data: {
        teamid: teamid,
        outcome: 'reset'
      }
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
    deleteGame: deleteGame,
    addWin: addWin,
    addLoss: addLoss,
    addTie: addTie,
    recalculateTeam: recalculateTeam
  };
})

.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
