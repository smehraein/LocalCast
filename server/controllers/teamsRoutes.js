/**
 * Router for all requests to '/teams'.
 *
 * GET: Accepts the follow queries:
 *         'id'  - Return team by Id
 *         'lid' - Return all teams in a given league
 *         'tn'  - Return teams by teamname
 *         ''    - Returns all users
 *
 * POST: Takes a teamname and leagueId and creates a new team.
 *
 * PUT: Takes two team Ids, two scores and creates a game
 *
 * DELETE: Accepts the follow queries:
 *         'id'  - Deletes a team
 *         'lid' - Deletes ALL teams in a league.
 *
 * @type {Object}
 */

var Teams = require('../models/teamsModel.js');

module.exports = {
  get: function (req, res) {
    if (req.query.id) {
      Teams.getById(req.query.id)
      .then(function (team) {
      res.json(team);
      });
    }
    else if (query.lid) {
      Teams.getByLeagueId(req.query.lid)
      .then(function (teams) {
      res.json(teams); 
      });
    }
    else if (query.tn) {
      Teams.getByTeamname(req.query.tn)
      .then(function (teams) {
      res.json(teams); 
      });
    }
    else {
      Teams.getAll()
      .then(function (teams) {
      res.json(teams); 
      });
    }
  },
  post: function (req, res) {
    if (!req.body.teamname || !req.body.leagueId) {
      res.sendStatus(400);
    }
    Teams.createTeam(req.body.teamname, req.body.leagueId)
    .then(function () {
      res.sendStatus(201);
    });
  },
  put: function (req, res) {
    if (!req.body.teamId || !req.body.opponentId) {
      res.sendStatus(400);
    }
    Teams.createGame(req.body.teamId, req.body.opponentId, req.body.teamScore, req.body.opponentScore)
    .then(function () {
      res.sendStatus(201);
    });
    if (req.body.outcome === "win") {
      db.Team.update(
        {wins: Sequelize.literal('wins + 1')},
        {where: {id: req.body.teamid}}
      ).then(function (league) {
        res.sendStatus(201);
      });
    }
    else if (req.body.outcome === "loss") {
      db.Team.update(
        {losses: Sequelize.literal('losses + 1')},
        {where: {id: req.body.teamid}}
      ).then(function (league) {
        res.sendStatus(201);
      });
    }
    else if (req.body.outcome === "tie") {
      db.Team.update(
        {ties: Sequelize.literal('ties + 1')},
        {where: {id: req.body.teamid}}
      ).then(function (league) {
        res.sendStatus(201);
      });
    }
    else if (req.body.outcome === "reset") {
      db.Team.update(
        {wins: 0, losses: 0, ties: 0},
        {where: {id: req.body.teamid}}
      ).then(function (league) {
        res.sendStatus(201);
      });
    }
    else {
      res.sendStatus(404);
    }
  },

  delete: function (req, res) {
    if (req.query.id) {
      db.Team.destroy({where: {id: req.query.id}})
      .then(function () {
        res.sendStatus(200);
      }).catch(function (err) {
        console.error(err);
      });
    }
    else if (query.lid) {
      db.Team.destroy({where: {leagueId: req.query.lid}})
      .then(function () {
        res.sendStatus(200);
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
};