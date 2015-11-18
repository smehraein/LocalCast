/**
 * Handles database requests for our routes controller.
 * Used to abstract away the more intensive database operations and for easier reading.
 */
var db = require('../db');

module.exports.getById = function (id) {
  return db.League.findById(id)
  .then(function (league) {
    return league;
  }).catch(function (err) {
    console.error("Error getting league with id ", id, " : ", err);
  });
};

module.exports.getAll = function () {
  return db.League.findAll()
  .then(function (leagues) {
    return leagues;
  }).catch(function (err) {
    console.error("Error getting all leagues: ", err);
  });
};

module.exports.createLeague = function (leaguename, description) {
  return db.League.create({
    leaguename: leaguename,
    description: description
  }).catch(function (err) {
    console.error("Error creating league: ", err);
  });
};

module.exports.deleteLeague = function (id) {
  return db.League.destroy({where: {id: id}})
  .catch(function (err) {
    console.error("Error deleting league: ", err);
  });
};
