var Sequelize = require("sequelize");
var orm = new Sequelize("localCast", "root", "SQL");


// we define the models we need using js--we don't need a schema file!
var User = orm.define('User', {
  username: Sequelize.STRING
});

var League = orm.define('League', {
  leaguename: Sequelize.STRING,
  sport: Sequelize.STRING
});

var Team = orm.define('Team', {
  teamname: Sequelize.STRING,
  rank: Sequelize.INTEGER,
  losses: Sequelize.INTEGER,
  wins: Sequelize.INTEGER,
  ties: Sequelize.INTEGER,
});

var Game = orm.define('Game', {
  team1: Sequelize.INTEGER,
  team2: Sequelize.INTEGER,
  team1score: Sequelize.INTEGER,
  team2score: Sequelize.INTEGER,
  date: Sequelize.DATE,
});



Team.belongsTo(League, {as: 'leagueId'});
User.belongsTo(Team, {as: 'teamId'});
Game.belongsTo(League, {as: 'leagueId'});
League.hasMany(Team);
Team.hasMany(Game);
Team.hasMany(User);
Game.hasMany(Team);


User.sync();
League.sync();
Team.sync();
Game.sync();
// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.

exports.User = User;
exports.League = League;
exports.Team = Team;
exports.Team = Team;