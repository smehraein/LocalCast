/**
 * @module controllerIndex
 * @description
 * Serves as an intermediate step between /server/routes.js and the 
 * individual router files within /servers/controllers/
 *
 * To add new routers, extend this object. Note that the 
 * property name associated with a given router must be the URL
 * being routed. E.g. the 'users' router is used when a request is
 * made to '/users'.
 * @type {obj}
 */
module.exports = {
  users: require('./usersRoutes'),
  leagues: require('./leaguesRoutes'),
  teams: require('./teamsRoutes')
};