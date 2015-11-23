var Sequelize = require("sequelize");
var db = require('../db');
var rp = require('request-promise');
var expect = require('../../node_modules/chai/chai').expect;

describe("Backend", function() {

  before(function() {
    sequelize = new Sequelize("localCast", "root", "SQL");
    sequelize.sync({force:true})
    .then(function() {
    });
  });

  it("Should insert a user into the DB", function() {
    var postOptions = {
      method: "POST",
      uri: "http://127.0.0.1:3000/users",
      body: { username: "Soroush" },
      json: true
    };

    return rp(postOptions)
    .then(function () {
      return db.User.findById(1);
    }).then(function (user) {
      expect(user.username).to.equal("Soroush");
    });
  });

  it("Should get users by ID", function() {
    var postOptions = {
      method: "POST",
      uri: "http://127.0.0.1:3000/users",
      body: { username: "Yoshio" },
      json: true
    };

    var getOptions = {
      method: "GET",
      uri: "http://127.0.0.1:3000/users/?id=1",
      json: true
    };

    return rp(postOptions)
    .then(function () {
      return rp(getOptions);
    }).then(function (user) {
      expect(user.username).to.equal("Soroush");
    });
  });

  it("Should get all users", function() {
    var getOptions = {
      method: "GET",
      uri: "http://127.0.0.1:3000/users",
      json: true
    };

    return rp(getOptions)
    .then(function (users) {
      expect(users.length).to.equal(2);
      expect(users[0].username).to.equal("Soroush");
      expect(users[1].username).to.equal("Yoshio");
    });
  });

  it("Should insert a league into the DB", function() {
    var postOptions = {
      method: "POST",
      uri: "http://127.0.0.1:3000/leagues",
      body: {
        leaguename: "Soroush's Test League",
        description: "Extreme underwater testing."
      },
      json: true
    };

    return rp(postOptions)
    .then(function () {
      return db.League.findById(1);
    }).then(function (league) {
      expect(league.leaguename).to.equal("Soroush's Test League");
      expect(league.description).to.equal("Extreme underwater testing.");
    });
  });

  it("Should insert a team into the DB", function() {
    var postOptions = {
      method: "POST",
      uri: "http://127.0.0.1:3000/teams",
      body: {
        teamname: "Soroush's Testing Team",
        leagueId: 1
      },
      json: true
    };

    var postOptions2 = {
      method: "POST",
      uri: "http://127.0.0.1:3000/teams",
      body: {
        teamname: "Yoshio's Testing Team",
        leagueId: 1
      },
      json: true
    };
    
    return rp(postOptions)
    .then(function () {
      return rp(postOptions2);
    }).then(function () {
      return db.Team.findById(1);
    }).then(function (team) {
      expect(team.teamname).to.equal("Soroush's Testing Team");
    });
  });

  it("Should put a user on a team", function() {
    var postOptions = {
      method: "PUT",
      uri: "http://127.0.0.1:3000/users",
      body: {
        userId: 1,
        teamId: 1
      },
      json: true
    };
    
    return rp(postOptions)
    .then(function () {
      return db.Team.findById(1);
    }).then(function (team) { // Test relation from team
      return team.getUsers();
    }).then(function (users) {
      expect(users[0].username).to.equal("Soroush");
      return db.User.findById(1); // Test relation from user
    }).then(function (user) {
      return user.getTeams();
    }).then(function (teams) {
      expect(teams[0].teamname).to.equal("Soroush's Testing Team");
    });
  });

  it("Should insert a game into the DB", function() {
    var postOptions = {
      method: "PUT",
      uri: "http://127.0.0.1:3000/teams",
      body: {
        teamId: 1,
        opponentId: 2,
        teamScore: 10,
        opponentScore: 5
      },
      json: true
    };

    return rp(postOptions)
    .then(function () {
      return db.Game.findById(1);
    }).then(function (game) { // Test data storage
      expect(game.teamId).to.equal(1);
      expect(game.opponentId).to.equal(2);
      expect(game.teamScore).to.equal(10);
      expect(game.opponentScore).to.equal(5);
    });
  });

  it("Should calculate the winner of a game", function() {
    return db.Game.findById(1)
    .then(function (game) {
      expect(game.getWinner()).to.equal(1);
    });
  });

  it("Should get the games of a team", function() {
    var getOptions = {
      method: "GET",
      uri: "http://127.0.0.1:3000/teams/?id=1&games=true",
      json: true
    };

    return rp(getOptions)
    .then(function (games) {
      expect(games.length).to.equal(1);
      expect(games[0][0].teamId).to.equal(1);
      expect(games[0][0].opponentId).to.equal(2);
      expect(games[0][1][0]).to.equal("Soroush's Testing Team");
      expect(games[0][1][1]).to.equal("Yoshio's Testing Team");
    });
  });

  it("Should calculate the stats of a team", function() {
    return db.Team.findById(1)
    .then(function (team) {
      return team.getStats();
    }).then(function (stats) {
      expect(stats.wins).to.equal(1);
      expect(stats.losses).to.equal(0);
      expect(stats.ties).to.equal(0);
    });
  });

  it("Should send stats with teams", function() {
    var getOptions = {
      method: "GET",
      uri: "http://127.0.0.1:3000/teams/?lid=1&stats=true",
      json: true
    };

    return rp(getOptions)
    .then(function (teamWithStats) {
      expect(teamWithStats.length).to.equal(2);
      expect(teamWithStats[0][0].id).to.equal(1);
      expect(teamWithStats[1][0].id).to.equal(2);
      expect(teamWithStats[0][1].wins).to.equal(1);
      expect(teamWithStats[0][1].losses).to.equal(0);
      expect(teamWithStats[0][1].ties).to.equal(0);
      expect(teamWithStats[1][1].wins).to.equal(0);
      expect(teamWithStats[1][1].losses).to.equal(1);
      expect(teamWithStats[1][1].ties).to.equal(0);
    });
  });

  it("Should delete a user", function() {
    var deleteOptions = {
      method: "DELETE",
      uri: "http://127.0.0.1:3000/users/?id=2",
      json: true
    };

    return rp(deleteOptions)
    .then(function () {
      return db.User.findById(2);
    }).then(function (user) {
      expect(user).to.equal(null);
      return db.User.findById(1);
    }).then(function (user) { // Don't delete the other user
      expect(user.username).to.equal("Soroush");
    });
  });

  it("Should delete a team", function() {
    var deleteOptions = {
      method: "DELETE",
      uri: "http://127.0.0.1:3000/teams/?id=2",
      json: true
    };

    return rp(deleteOptions)
    .then(function () {
      return db.Team.findById(2);
    }).then(function (team) {
      expect(team).to.equal(null);
      return db.Game.findById(1);
    }).then(function (game) {
      expect(game).to.equal(null);
      return db.Team.findById(1);
    }).then(function (team) { // Don't delete the other Team
      expect(team.teamname).to.equal("Soroush's Testing Team");
    });
  });

  it("Should delete a league", function() {
    var deleteOptions = {
      method: "DELETE",
      uri: "http://127.0.0.1:3000/leagues/?id=1",
      json: true
    };

    return rp(deleteOptions)
    .then(function () {
      return db.League.findById(1);
    }).then(function (league) {
      expect(league).to.equal(null);
      return db.Team.findById(1);
    }).then(function (team) { // Should also delete teams in the league
      expect(team).to.equal(null);
    });
  });
});