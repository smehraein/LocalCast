/**
 * @module leaguesRoutes
 * @description Router for all requests to '/leagues'.
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
  /**
   * Get handler.
   * @param  {int} id LeagueId used to search for a specific league
   * @return {varies}
   */
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
  /**
   * Post handler.
   * @param  {string} leaguename  Name for a new league
   * @param  {string} description Description of new league
   * @return {obj}                The newly created league
   */
  post: function (req, res) {
    if (!req.body.leaguename || !req.body.description) {
      res.sendStatus(400);
    }
    Leagues.createLeague(req.body.leaguename, req.body.description)
    .then(function (league) {
      res.status(201).json(league);
    });
  },
  put: function (req, res) {

  },
  /**
   * Delete handler.
   * @param  {int} id Id of the league to delete
   * @return {void}
   */
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
