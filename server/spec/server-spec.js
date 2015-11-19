/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */
var Sequelize = require("sequelize");
var mysql = require('mysql');
var db = require('../db');
var rp = require('request-promise');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Backend", function() {
  var dbConnection;

  before(function(done) {
    sequelize = new Sequelize("localCast", "root", "SQL");
    sequelize.sync({force:true})
    .then(function() {
      done();
    });
  });

  it("Should insert a user into the DB", function(done) {
    var postOptions = {
      method: "POST",
      uri: "http://127.0.0.1:3000/users",
      body: { username: "Soroush" },
      json: true
    };

    rp(postOptions)
    .then(function () {
      return db.User.findById(1);
    })
    .then(function (user) {
      expect(user.username).to.equal("Soroush");
      done();
    });
  });

  it("Should get users by ID", function(done) {
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

    rp(postOptions)
    .then(function () {
      return rp(getOptions);
    })
    .then(function (user) {
      expect(user.username).to.equal("Soroush");
      done();
    });
  });

  it("Should get all users", function(done) {
    var getOptions = {
      method: "GET",
      uri: "http://127.0.0.1:3000/users",
      json: true
    };

    rp(getOptions)
    .then(function (users) {
      expect(users.length).to.equal(2);
      expect(users[0].username).to.equal("Soroush");
      expect(users[1].username).to.equal("Yoshio");
      done();
    });
  });

  it("Should insert a league into the DB", function(done) {
    var postOptions = {
      method: "POST",
      uri: "http://127.0.0.1:3000/leagues",
      body: {
        leaguename: "Soroush's Test League",
        description: "Extreme underwater testing."
      },
      json: true
    };

    rp(postOptions)
    .then(function () {
      return db.League.findById(1);
    })
    .then(function (league) {
      expect(league.leaguename).to.equal("Soroush's Test League");
      done();
    });
  });

  it("Should insert a team into the DB", function(done) {
    var postOptions = {
      method: "POST",
      uri: "http://127.0.0.1:3000/teams",
      body: {
        teamname: "Soroush's Testing Team",
        leagueId: 1
      },
      json: true
    };
    
    rp(postOptions)
    .then(function () {
      return db.Team.findById(1);
    })
    .then(function (team) {
      expect(team.teamname).to.equal("Soroush's Testing Team");
      done();
    });
  });

  it("Should put a user on a team", function(done) {
    var postOptions = {
      method: "PUT",
      uri: "http://127.0.0.1:3000/users",
      body: {
        userId: 1,
        teamId: 1
      },
      json: true
    };
    
    rp(postOptions)
    .then(function () {
      return db.Team.findById(1);
    })
    .then(function (team) { // Test relation from team
      return team.getUsers();
    })
    .then(function (users) {
      expect(users[0].username).to.equal("Soroush");
      return db.User.findById(1); // Test relation from user
    })
    .then(function (user) {
      return user.getTeams();
    })
    .then(function (teams) {
      expect(teams[0].teamname).to.equal("Soroush's Testing Team");
      done();
    });
  });

  it("Should insert a game into the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/games",
              json: { team1id: 1,
                      team2id: 1,
                      team1score: 10,
                      team2score: 20 }
    }, function () {
        // Now if we look in the database, we should find the
        // user there.
        var queryString = "SELECT * FROM Games";
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].team1).to.equal(1);
          expect(results[0].team1score).to.equal(10);
          done();
        });
      });
    });

  it("Should insert users with a team into the DB", function(done) {
    // Post the user to the chat server.
   request({ method: "POST",
              uri: "http://127.0.0.1:3000/users",
              json: { username: "Yoshi",
                      teamid: 1 }
    }, function() {
     request({ method: "POST",
                uri: "http://127.0.0.1:3000/users",
                json: { username: "David",
                        teamid: 1 }
      }, function () {
          // Now if we look in the database, we should find the
          // user there.
          var queryString = "SELECT * FROM Users";
          var queryArgs = [];

          dbConnection.query(queryString, queryArgs, function(err, results) {
            // Should have one result:
            expect(results.length).to.equal(3);

            // TODO: If you don't have a column named text, change this test.
            expect(results[2].username).to.equal("David");

            done();
          });
        });
      });
    });


  it("Should find user by team", function(done) {
    // Post the user to the chat server.
   request({ method: "GET",
              uri: "http://127.0.0.1:3000/users",
              json: { teamid: 1 }
    }, function (err, response) {
          // Should have one result:
          expect(response.body.length).to.equal(2);

          // TODO: If you don't have a column named text, change this test.
          expect(response.body[1].username).to.equal("David");
          done();
        });
      });
  });