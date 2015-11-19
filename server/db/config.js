var Sequelize = require("sequelize");
var orm = new Sequelize("localCast", "root", "SQL");

// we define the models we need using js--we don't need a schema file!
var User = orm.define('User', {
  username: Sequelize.STRING,
});

var League = orm.define('League', {
  leaguename: Sequelize.STRING,
  description: Sequelize.STRING
});

var Team = orm.define('Team', {
  teamname: Sequelize.STRING,
  },
  { instanceMethods: {
    getStats: function() {
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
        else if (winner === this.id) {
          stats.wins += 1;
        }
        else {
          stats.losses += 1;
        }
      };
      Sequelize.Promise.all(this.getGame(), calculate)
      .then(function () {
        return stats;
      });
    }
  }
});

var Game = orm.define('Game', {
  team1score: Sequelize.INTEGER,
  team2score: Sequelize.INTEGER
  },
  { instanceMethods: {
    getWinner: function() {
      if (this.team1score === this.team2score) {
        return null;
      }
      else if (this.team1score > this.team2score) {
        return this.TeamId;
      }
      else {
        return this.OpponentId;
      }
    }
  }
});

var Roster = orm.define('Roster', {
});

// Assign associations
Team.belongsTo(League);
User.belongsToMany(Team, {through: Roster});
Team.belongsToMany(User, {through: Roster});
Team.belongsToMany(Team, {as: "Opponent", through: Game});

// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing tables and make new ones.
sequelize.sync({force:true});

exports.User = User;
exports.League = League;
exports.Team = Team;
exports.Game = Game;
exports.Roster = Roster;