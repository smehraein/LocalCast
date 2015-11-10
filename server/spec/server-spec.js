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