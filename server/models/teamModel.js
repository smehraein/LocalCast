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
    LeagueId: leagueId,
  }).catch(function (err) {
    console.error("Error creating team: ", err);
  });
};

module.exports.createGame = function (teamId, opponentId, teamScore, opponentScore) {
  return db.Game.create({
    TeamId: teamId,
    OpponentId: opponentId,
    teamScore: teamScore || 0,
    opponentScore: opponentScore || 0
  }).catch(function (err) {
    console.error("Error creating game: ", err);
  });
};

module.exports.deleteTeam = function (id) {
  return db.Team.destroy({where: {id: id}})
  .catch(function (err) {
    console.error("Error deleting team: ", err);
  });
};
