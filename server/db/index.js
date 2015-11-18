var Sequelize = require("sequelize");
var orm = new Sequelize("localCast", "root", "SQL");


// we define the models we need using js--we don't need a schema file!
var User = orm.define('User', {
  username: Sequelize.STRING,
});

var League = orm.define('League', {
  leaguename: Sequelize.STRING,
  sport: Sequelize.STRING
});

var Team = orm.define('Team', {
  teamname: Sequelize.STRING,
  losses: Sequelize.INTEGER,
  wins: Sequelize.INTEGER,
  ties: Sequelize.INTEGER,
});

var Game = orm.define('Game', {
  team1score: Sequelize.INTEGER,
  team2score: Sequelize.INTEGER
});

var Roster = orm.define('Roster', {
});


// Assign associations
Team.belongsTo(League);
User.belongsToMany(Team, {through: Roster});
Team.belongsToMany(User, {through: Roster});
Team.belongsToMany(Team, {as: "Game", through: Game});


// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing tables and make new ones.
sequelize.sync({force:true});

exports.User = User;
exports.League = League;
exports.Team = Team;
exports.Game = Game;
exports.Roster = Roster;