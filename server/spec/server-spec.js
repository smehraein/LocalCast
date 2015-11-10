/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Users", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "SQL",
      database: "localCast"
    });
    dbConnection.connect();


    var tablename = "Users";
    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("truncate " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert a user into the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/users",
              json: { username: "Soroush" }
    }, function () {
        // Now if we look in the database, we should find the
        // user there.
        var queryString = "SELECT * FROM Users";
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].username).to.equal("Soroush");

          done();
        });
      });
    });

  it("Should get users by ID", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/users",
              json: { username: "Soroush" }
    }, function () {
      request({ method: "GET",
              uri: "http://127.0.0.1:3000/users",
              json: { userid: 1 }
      }, function (err, response) {
        // Should have one result:
        expect(response.body.username).to.equal("Soroush");
        done();
        });
      });
    });
  });



describe("Leagues", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "SQL",
      database: "localCast"
    });
    dbConnection.connect();


    var tablename = "Leagues";
    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // dbConnection.query("truncate " + tablename, done);

    dbConnection.query("SET FOREIGN_KEY_CHECKS = 0", function() {
      dbConnection.query("truncate " + tablename, function() {
        dbConnection.query("SET FOREIGN_KEY_CHECKS = 0", done);
      });
    });
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert a league into the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/leagues",
              json: { leaguename: "Soroushs Cool League",
                      sport: "Yurting" }
    }, function () {
        // Now if we look in the database, we should find the
        // user there.
        var queryString = "SELECT * FROM Leagues";
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].leaguename).to.equal("Soroushs Cool League");
          expect(results[0].sport).to.equal("Yurting");

          done();
        });
      });
    });
  });

describe("Teams", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "SQL",
      database: "localCast"
    });
    dbConnection.connect();


    var tablename = "Teams";
    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // dbConnection.query("truncate " + tablename, done);

    dbConnection.query("SET FOREIGN_KEY_CHECKS = 0", function() {
      dbConnection.query("truncate " + tablename, function() {
        dbConnection.query("SET FOREIGN_KEY_CHECKS = 0", done);
      });
    });
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert a team into the DB", function(done) {
    // Post the user to the chat server.
    request({ method: "POST",
              uri: "http://127.0.0.1:3000/teams",
              json: { teamname: "Soroushs Cool Team",
                      leagueId: 1,
                      wins: 99,
                      losses: 0,
                      ties: 0 }
    }, function () {
        // Now if we look in the database, we should find the
        // user there.
        var queryString = "SELECT * FROM Teams";
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].teamname).to.equal("Soroushs Cool Team");
          expect(results[0].leagueId).to.equal(1);
          done();
        });
      });
    });
  });

describe("Games", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "SQL",
      database: "localCast"
    });
    dbConnection.connect();


    var tablename = "Games";
    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // dbConnection.query("truncate " + tablename, done);

    dbConnection.query("SET FOREIGN_KEY_CHECKS = 0", function() {
      dbConnection.query("truncate " + tablename, function() {
        dbConnection.query("SET FOREIGN_KEY_CHECKS = 0", done);
      });
    });
  });

  afterEach(function() {
    dbConnection.end();
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
  });