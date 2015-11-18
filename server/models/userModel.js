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
    console.error("Error getting user with id ", id, " : ", err);
  });
};

module.exports.getByTeamId = function (id) {
  return db.User.findAll({where: {teamId: id}})
  .then(function (users) {
    return users;
  }).catch(function (err) {
    console.error("Error getting users by team id: ", err);
  });
};

module.exports.getAll = function () {
  return db.User.findAll()
  .then(function (users) {
    return users;
  }).catch(function (err) {
    console.error("Error getting all users: ", err);
  });
};

module.exports.createUser = function (username) {
  return db.User.create({
    username: username
  }).catch(function (err) {
    console.error("Error creating user: ", err);
  });
};

module.exports.addUserToTeam = function (userId, teamId) {
  var currentUser;
  return module.exports.getById(userId)
  .then(function (user) {
    currentUser = user;
    return db.Team.findById(teamId);
  })
  .then(function (team) {
    return team.addUser(currentUser);
  }).catch(function (err) {
    console.error("Error adding user to team: ", err);
  });
};

module.exports.removeUserFromTeam = function (userId, teamId) {
  return db.Roster.destroy({where: {
    UserId: userId,
    TeamId: teamId
  }}).catch(function (err) {
    console.error("Error removing user from team: ", err);
  });
};

module.exports.deleteUser = function (id) {
  return db.User.destroy({where: {id: id}})
  .catch(function (err) {
    console.error("Error deleting user: ", err);
  });
};
