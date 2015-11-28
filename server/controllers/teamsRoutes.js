/**
 * @module teamsRoutes
 * @description
 * Router for all requests to '/teams'.
 *
 * GET: Accepts the follow queries:
 *         'id'           - Return team by Id
 *         'id & games'   - Return games involving the team with Id
 *         'lid'          - Return all teams in a given league
 *         'lid & stats'  - Return all teams in a given league with stats
 *         'tn'           - Return teams by teamname
 *         ''             - Returns all users
 *
 * POST: Takes a teamname and leagueId and creates a new team.
 *
 * PUT: Takes two team Ids, two scores and creates a game
 *
 * DELETE: Accepts the follow queries:
 *         'id'  - Deletes a team
 *
 * @type {Object}
 */

var Teams = require('../models/teamModel.js');

module.exports = {
  get: function (req, res) {
    if (req.query.id && req.query.games) {
      Teams.getGames(req.query.id)
      .then(function (games) {
      res.json(games);
      });
    }
    else if (req.query.id && req.query.stats) {
      Teams.getByIdWithStats(req.query.id)
      .then(function (teamWithStats) {
      res.json(teamWithStats);
      });
    }
    else if (req.query.id) {
      Teams.getById(req.query.id)
      .then(function (team) {
      res.json(team);
      });
    }
    else if (req.query.lid && req.query.stats) {
      Teams.getByLeagueIdWithStats(req.query.lid)
      .then(function (teamsWithStats) {
      res.json(teamsWithStats); 
      });
    }
    else if (req.query.lid) {
      Teams.getByLeagueId(req.query.lid)
      .then(function (teams) {
      res.json(teams); 
      });
    }
    else if (req.query.tn) {
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
    console.log(req.body);
    if (!req.body.teamname || !req.body.leagueId) {
      res.sendStatus(400);
    }
    else {
      Teams.createTeam(req.body.teamname, req.body.leagueId)
      .then(function () {
        res.sendStatus(201);
      });
    }
  },
  put: function (req, res) {
    if (!req.body.teamId || !req.body.opponentId) {
      res.sendStatus(400);
      res.end();
    }
    Teams.createGame(req.body.teamId, req.body.opponentId, req.body.teamScore, req.body.opponentScore)
    .then(function () {
      res.sendStatus(201);
    });
  },
  delete: function (req, res) {
    if (req.query.gid) {
      Teams.deleteGame(req.query.gid)
      .then(function () {
        res.sendStatus(200);
      });
    }
    else if (req.query.id) {
      Teams.deleteTeam(req.query.id)
      .then(function () {
        res.sendStatus(200);
      });
    }
    else {
      res.sendStatus(400);
    }
  }
};
