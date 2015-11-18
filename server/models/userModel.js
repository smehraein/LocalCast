/**
 * Handles database requests for our routes controller.
 * Used to abstract away the more intensive database operations and for easier reading.
 */

var db = require('../db');
var url = require('url');
var Sequelize = require('sequelize');

module.exports.getById = function (id) {
  return db.User.findById(id)
  .then(function (user) {
    return user;
  }).catch(function (err) {
    console.error(err);
  });
};

module.exports.getByTeamId = function (id) {
  return db.User.findAll({where: {teamId: id}})
  .then(function (users) {
    return users;
  }).catch(function (err) {
    console.error(err);
  });
};

module.exports.getAll = function () {
  db.User.findAll()
  .then(function (users) {
    return users;
  }).catch(function (err) {
    console.error(err);
  });
};