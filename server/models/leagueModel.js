/**
 * @module leagueModel
 */

var Sequelize = require("sequelize");
var db = require('../db');
var TeamModel = require('./TeamModel.js');

/**
 * Returns a league with a given Id.
 * @param  {int} leagueId Id of the league to return
 * @return {obj}          League object from database
 */
module.exports.getById = function (leagueId) {
  return db.League.findById(leagueId)
  .then(function (league) {
    return league;
  }).catch(function (err) {
    console.error("Error getting league with id ", leagueId, " : ", err);
  });
};

/**
 * Returns all leagues in the database.
 * @return {array} Array containing all leagues
 */
module.exports.getAll = function () {
  return db.League.findAll()
  .then(function (leagues) {
    return leagues;
  }).catch(function (err) {
    console.error("Error getting all leagues: ", err);
  });
};

/**
 * Creates a new league with a given name and description, then returns it.
 * @param  {string} leaguename  Name of the new league
 * @param  {string} description Description of the new league
 * @return {obj}                Newly created league
 */
module.exports.createLeague = function (leaguename, description) {
  return db.League.create({
    leaguename: leaguename,
    description: description
  }).then(function (league) {
    return league;
  }).catch(function (err) {
    console.error("Error creating league: ", err);
  });
};

/**
 * Deletes league with a given Id. Will destroy all teams within that league as well.
 * @param  {int} leagueId Id of the league to be deleted
 * @return {void}
 */
module.exports.deleteLeague = function (leagueId) {
  return TeamModel.getByLeagueId(leagueId)
  .then(function (teams) {
    return Sequelize.Promise.map(teams, function (team) {
      return TeamModel.deleteTeam(team.id);
    });
  })
  .then(function () {
    return db.League.destroy({where: {id: leagueId}});
  })
  .catch(function (err) {
    console.error("Error deleting league: ", err);
  });
};
