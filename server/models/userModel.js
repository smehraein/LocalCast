/**
 * @module userModel
 */

var db = require('../db');

/**
 * Gets a single user by Id.
 * @param  {int} userId Id of the user to return
 * @return {obj}        User object from database
 */
module.exports.getById = function (userId) {
  return db.User.findById(userId)
  .then(function (user) {
    return user;
  }).catch(function (err) {
    console.error("Error getting user with id ", userId, " : ", err);
  });
};

/**
 * Returns all members of a given team.
 * @param  {int} teamId Id of the team to retrieve members of
 * @return {array}      Array of users belonging to the provided team
 */
module.exports.getByTeamId = function (teamId) {
  return db.Team.findById(teamId)
  .then(function (team) {
    return team.getUsers();
  }).catch(function (err) {
    console.error("Error getting users by team id: ", err);
  });
};

/**
 * Returns all users in the database.
 * @return {array} Array of all users
 */
module.exports.getAll = function () {
  return db.User.findAll()
  .then(function (users) {
    return users;
  }).catch(function (err) {
    console.error("Error getting all users: ", err);
  });
};

/**
 * Creates and returns a new user.
 * @param  {string} username Name of the new user
 * @return {obj}             The newly created user
 */
module.exports.createUser = function (username) {
  return db.User.create({
    username: username
  }).then(function (user) {
    return user;
  }).catch(function (err) {
    console.error("Error creating user: ", err);
  });
};

/**
 * Adds a user to a given team.
 * @param {int} userId Id of the user to add
 * @param {int} teamId Id of the team to add the user to
 * @return {void}
 */
module.exports.addUserToTeam = function (userId, teamId) {
  return db.Roster.findOrCreate({where: {
    UserId: userId,
    TeamId: teamId
  }}).catch(function (err) {
    console.error("Error adding user to team: ", err);
  });
};

/**
 * Removes a user from a given team.
 * @param  {int} userId Id of the user to remove
 * @param  {int} teamId Id of the team to remove user from
 * @return {void}
 */
module.exports.removeUserFromTeam = function (userId, teamId) {
  return db.Roster.destroy({where: {
    UserId: userId,
    TeamId: teamId
  }}).catch(function (err) {
    console.error("Error removing user from team: ", err);
  });
};

/**
 * Deletes a user.
 * @param  {int} userId Id of the user to delete
 * @return {void}
 */
module.exports.deleteUser = function (userId) {
  return db.User.destroy({where: {id: userId}})
  .catch(function (err) {
    console.error("Error deleting user: ", err);
  });
};
