/**
 * Router for all requests to '/users'.
 *
 * GET: Accepts the follow queries:
 *         'id'  - Return user by Id
 *         'tid' - Return all users in a given team
 *         ''    - Returns all users
 *
 * POST: Takes a username and creates a new user.
 *
 * PUT: Takes a userId and teamId and associates them.
 *
 * DELETE: Accepts the follow queries:
 *         'tid' & 'id' - Removes a user from a given team.
 *         'id'         - Deletes a user
 *
 * @type {Object}
 */

var Users = require('../models/userModel.js');

module.exports = {
  get: function (req, res) {
    if (req.query.id) {
      Users.getById(req.query.id)
      .then(function (user) {
      res.json(user);
      });
    }
    else if (query.tid) {
      Users.getByTeamId(req.query.tid)
      .then(function (users) {
      res.json(users); 
      });
    }
    else {
      Users.getAll()
      .then(function (users) {
      res.json(users); 
      });
    }
  },
  post: function (req, res) {
    if (!req.body.username) {
      res.sendStatus(400);
    }
    Users.createUser(req.body.username)
    .then(function () {
      res.sendStatus(201);
    });
  },
  put: function (req, res) {
    if (!req.body.userId || !req.body.teamId) {
      res.sendStatus(400);
    }
    Users.addUserToTeam(req.body.userId, req.body.teamId)
    .then(function () {
      res.sendStatus(201);
    });
  },
  delete: function (req, res) {
    if (req.query.id && req.query.tid) {
      Users.removeUserFromTeam(req.query.id, req.query.tid)
      .then(function () {
        res.sendStatus(200);
      });
    }
    else if (req.query.id) {
      Users.deleteUser(req.query.id)
      .then(function () {
        res.sendStatus(200);
      });
    }
    else {
      res.sendStatus(400);
    }
  }
};