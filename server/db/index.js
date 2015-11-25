/**
 * @module db
 * @description Database module - utilizes mySQL and Sequelize ORM.
 */

var Sequelize = require("sequelize");
var options = {
  database : process.env.RDS_DATABASE || "localCast",
  user     : process.env.RDS_USERNAME || "root",
  password : process.env.RDS_PASSWORD || "SQL",
  host     : process.env.RDS_HOSTNAME || "localhost",
};
var sequelize = new Sequelize(options.database, options.user, options.password, {host: options.host});

/**
 * Represents users in our system.
 * @constructor
 * @param {int} id UserId
 * @param {string} username Name of the user
 */
var User = sequelize.define('User', {
  username: Sequelize.STRING,
});

/**
 * Represents leagues in our system.
 * @constructor
 * @param {int} id              LeagueId
 * @param {string} leaguename   Name of the league
 * @param {string} description  Short description of the league
 */
var League = sequelize.define('League', {
  leaguename: Sequelize.STRING,
  description: Sequelize.STRING
});

/**
 * Represents teams in our system.
 * @constructor
 * @param {int} id              TeamId
 * @param {string} leaguename   Name of the team
 */
var Team = sequelize.define('Team', {
  teamname: Sequelize.STRING,
  },
  { instanceMethods: {
    /**
     * Returns all games in which this team participated.
     * @return {array} Array of games
     */
    getGames: function() {
      var teamId = this.id;
      var teamName = this.teamname;
      return Game.findAll({
        where : {
          $or: [
          {teamId: teamId},
          {opponentId: teamId}
          ]
        }
      })
      .then(function (games) {
        return Sequelize.Promise.map(games, function (game) {
          if (game.teamId === teamId) {
            return Team.findById(game.opponentId)
            .then(function (team) {
              return [game, [teamName, team.teamname]];
            });
          }
          else {
            return Team.findById(game.teamId)
            .then(function (team) {
              return [game, [team.teamname, teamName]];
            });
          }
        });
      });
    },
    /**
     * Returns an object listing the team's current wins, losses and ties
     * @return {obj} Object with 'wins', 'losses' and 'ties' values
     */
    getStats: function() {
      var teamId = this.id;
      var stats = {
        wins: 0,
        losses: 0,
        ties: 0
      };
      
      var calculate = function (game) {
        var winner = game.getWinner();
        if (winner === null) {
          stats.ties += 1;
        }
        else if (winner === teamId) {
          stats.wins += 1;
        }
        else {
          stats.losses += 1;
        }
      };

      return Game.findAll({
        where : {
          $or: [
          {teamId: teamId},
          {opponentId: teamId}
          ]
        }
      })
      .then(function (games) {
      for (var i=0; i<games.length; i++) {
        calculate(games[i]);
      }
      return stats;
      });
    }
  }
});

/**
 * Represents games in our system.
 * @constructor
 * @param {int} id            GameId
 * @param {string} teamId     Id of the home team
 * @param {string} opponentId Id of the away team
 * @param {int} teamScore     Score of the home team
 * @param {int} opponentScore Score of the away team
 */
var Game = sequelize.define('Game', {
  teamId: Sequelize.INTEGER,
  opponentId: Sequelize.INTEGER,
  teamScore: Sequelize.INTEGER,
  opponentScore: Sequelize.INTEGER
  },
  { instanceMethods: {
    /**
     * Returns the teamId of the team which won the game.
     * @return {int} Id of the winning team
     */
    getWinner: function() {
      if (this.teamScore === this.opponentScore) {
        return null;
      }
      else if (this.teamScore > this.opponentScore) {
        return this.teamId;
      }
      else {
        console.log(this.opponentId);
        return this.opponentId;
      }
    }
  }
});

/**
 * Represents members of teams in our system. May not need this expicitly.
 * @constructor
 */
var Roster = sequelize.define('Roster', {
});

/**
 * Resets all tables in the database.
 * @return {promise} Resolves when tables are remade
 */
var reset = function () {
  return sequelize.sync({force:true});  
};

// Assign associations
Team.belongsTo(League);
User.belongsToMany(Team, {through: Roster});
Team.belongsToMany(User, {through: Roster});

// Creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing tables and make new ones.
sequelize.sync();

module.exports = {
  User: User,
  League: League,
  Team: Team,
  Game: Game,
  Roster: Roster,
  reset: reset
};