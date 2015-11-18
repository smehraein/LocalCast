/**
 * Handles database requests for our routes controller.
 * Used to abstract away the more intensive database operations and for easier reading.
 */

var db = require('../db');

module.exports.getById = function (id) {
  return db.Team.findById(id)
  .then(function (team) {
    return team;
  }).catch(function (err) {
    console.error("Error getting team with id ", id, " : ", err);
  });
};

module.exports.getByLeagueId = function (leagueId) {
  return db.Team.findAll({where: {leagueId: leagueId}})
  .then(function (teams) {
    return teams;
  }).catch(function (err) {
    console.error("Error getting teams within league id ", id, " : ", err);
  });
};

module.exports.getByTeamname = function (teamname) {
  return db.Team.findAll({where: {teamname: teamname}})
  .then(function (teams) {
    return teams;
  }).catch(function (err) {
    console.error("Error getting teams with name ", name, " : ", err);
  });
};

module.exports.getAll = function () {
  return db.Team.findAll()
  .then(function (teams) {
    return teams;
  }).catch(function (err) {
    console.error("Error getting all teams: ", err);
  });
};

module.exports.createTeam = function (teamname, leagueId) {
  return db.Team.create({
    teamname: teamname,
    leagueId: leagueId,
    wins: 0,
    losses: 0,
    ties: 0
  }).catch(function (err) {
    console.error("Error creating team: ", err);
  });
};