var Sequelize = require("sequelize");
var options = {
  database : process.env.RDS_DATABASE || "localCast",
  user     : process.env.RDS_USERNAME || "root",
  password : process.env.RDS_PASSWORD || "SQL",
  host     : process.env.RDS_HOSTNAME || "localhost",
};
var sequelize = new Sequelize(options.database, options.user, options.password, {host: options.host});

var User = sequelize.define('User', {
  username: Sequelize.STRING,
});

var League = sequelize.define('League', {
  leaguename: Sequelize.STRING,
  description: Sequelize.STRING
});

var Team = sequelize.define('Team', {
  teamname: Sequelize.STRING,
  },
  { instanceMethods: {
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

var Game = sequelize.define('Game', {
  teamId: Sequelize.INTEGER,
  opponentId: Sequelize.INTEGER,
  teamScore: Sequelize.INTEGER,
  opponentScore: Sequelize.INTEGER
  },
  { instanceMethods: {
    getWinner: function() {
      if (this.teamScore === this.opponentScore) {
        return null;
      }
      else if (this.teamScore > this.opponentScore) {
        return this.teamId;
      }
      else {
        return this.ppponentId;
      }
    }
  }
});

var Roster = sequelize.define('Roster', {
});

// Assign associations
Team.belongsTo(League);
User.belongsToMany(Team, {through: Roster});
Team.belongsToMany(User, {through: Roster});

// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing tables and make new ones.
sequelize.sync({force:true});

exports.User = User;
exports.League = League;
exports.Team = Team;
exports.Game = Game;
exports.Roster = Roster;