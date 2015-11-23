/**
 * @module teamModel
 */

var Sequelize = require("sequelize");
var db = require('../db');

/**
 * Returns a team from the database based on Id.
 * @param  {int} teamId Id of the team to retreive.
 * @return {obj}    team object from database
 */
module.exports.getById = function (teamId) {
  return db.Team.findById(teamId)
  .then(function (team) {
    return team;
  }).catch(function (err) {
    console.error("Error getting team with id ", id, " : ", err);
  });
};

/**
 * Returns all teams which have a given leagueId.
 * @param  {int} leagueId Id of the league to search through
 * @return {array}        All teams within the provided league
 */
module.exports.getByLeagueId = function (leagueId) {
  return db.Team.findAll({where: {leagueId: leagueId}})
  .then(function (teams) {
    return teams;
  }).catch(function (err) {
    console.error("Error getting teams within league id ", id, " : ", err);
  });
};

/**
 * Queries for all teams in a given league, then calls the team's 
 * getStats() method for each & stores the value in a tuple with the team.
 * Used to populate a league's 'teams' page.
 * @param  {int} leagueId Id of the league these teams belong to
 * @return {array}        Tuple with team + object containing stats
 */
module.exports.getByLeagueIdWithStats = function (leagueId) {
  return db.Team.findAll({where: {leagueId: leagueId}})
  .then(function (teams) {
    return Sequelize.Promise.map(teams, function(team) {
      return team.getStats().then(function (stats) {
        return [team, stats];
      });
    });
  }).catch(function (err) {
    console.error("Error getting teams within league id ", id, " : ", err);
  });
};

/**
 * Returns teams from database given the name.
 * Can return more than one team!
 * @param  {string} teamname Name of a team
 * @return {array}           Array of teams which have the provided name
 */
module.exports.getByTeamname = function (teamname) {
  return db.Team.findAll({where: {teamname: teamname}})
  .then(function (teams) {
    return teams;
  }).catch(function (err) {
    console.error("Error getting teams with name ", name, " : ", err);
  });
};

/**
 * Returns all teams in the database.
 * @return {array} Array containing all teams
 */
module.exports.getAll = function () {
  return db.Team.findAll()
  .then(function (teams) {
    return teams;
  }).catch(function (err) {
    console.error("Error getting all teams: ", err);
  });
};

/**
 * Creates a team with a given name and leagueId.
 * All teams must belong to a league.
 * @param  {string} teamname Name of the new team.
 * @param  {[type]} leagueId Id of the league it will belong to.
 * @return {void}
 */
module.exports.createTeam = function (teamname, leagueId) {
  return db.Team.create({
    teamname: teamname,
    LeagueId: leagueId,
  }).catch(function (err) {
    console.error("Error creating team: ", err);
  });
};

/**
 * Creates a new game, which is represented as a join between two teams.
 * One team is referred to as 'opponent', so remember to search BOTH
 * 'teamId' and 'opponentId' when looking for a team's games.
 * @param  {int} teamId        Id of the first team
 * @param  {int} opponentId    Id of the second team
 * @param  {int} teamScore     Score of the first team - defaults to 0
 * @param  {int} opponentScore Score of the second team - defaults to 0
 * @return {void}
 */
module.exports.createGame = function (teamId, opponentId, teamScore, opponentScore) {
  return db.Game.create({
    teamId: teamId,
    opponentId: opponentId,
    teamScore: teamScore || 0,
    opponentScore: opponentScore || 0
  }).catch(function (err) {
    console.error("Error creating game: ", err);
  });
};

/**
 * Returns all games which a team participated in as an array of tuples 
 * with the game info and the names of the participating teams.
 * @param  {int} teamId Id of the team to get games for
 * @return {array}      Array of the games the team participated in
 */
module.exports.getGames = function (teamId) {
  return db.Team.findById(teamId)
  .then(function (team) {
    return team.getGames();
  }).catch(function (err) {
    console.error("Error getting games: ", err);
  });
};

/**
 * Deletes a game with the provided id.
 * @param  {int} gameId Id of the game to delete
 * @return {void}
 */
module.exports.deleteGame = function (gameId) {
  return db.Game.destroy({where: {id: gameId}})
  .catch(function (err) {
    console.error("Error deleting game: ", err);
  });
};

/**
 * Deletes a team with the provided id.
 * @param  {int} id Id of the team to delete
 * @return {void}
 */
module.exports.deleteTeam = function (id) {
  return db.Team.destroy({where: {id: id}})
  .catch(function (err) {
    console.error("Error deleting team: ", err);
  });
};
