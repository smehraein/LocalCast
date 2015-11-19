/**
 * Router for all requests to '/leagues'.
 *
 * GET: Accepts the follow queries:
 *         'id'  - Return league by Id
 *         ''    - Returns all leagues
 *
 * POST: Takes a name and description and creates a new league.
 *
 * PUT:
 *
 * DELETE: Accepts the follow queries:
 *         'id'         - Deletes a league
 *
 * @type {Object}
 */

var Leagues = require('../models/leagueModel.js');

module.exports = {
  get: function (req, res) {
    if (req.query.id) {
      Leagues.getById(req.query.id)
      .then(function (league) {
      res.json(league);
      });
    }
    else {
      Leagues.getAll()
      .then(function (leagues) {
      res.json(leagues); 
      });
    }
  },
  post: function (req, res) {
    if (!req.body.leaguename || !req.body.description) {
      res.sendStatus(400);
    }
    Leagues.createLeague(req.body.leaguename, req.body.description)
    .then(function () {
      res.sendStatus(201);
    });
  },
  put: function (req, res) {

  },
  delete: function (req, res) {
    if (req.query.id) {
      Leagues.deleteLeague(req.query.id)
      .then(function () {
        res.sendStatus(200);
      });
    }
    else {
      res.sendStatus(400);
    }
  }
};
