var db = require('../db');
var url = require('url');
var Sequelize = require('sequelize');

module.exports = {
  get: function (req, res) {
    if (req.query.id) {
      return db.Team.findById(req.query.id)
      .then(function (team) {
        res.json(team);
      }).catch(function (err) {
        console.error(err);
      });
    }
    else if (req.query.lid) {
     return db.Team.findAll({where: {leagueId: req.query.lid}})
     .then(function (teams) {
        res.json(teams);
     }).catch(function (err) {
        console.error(err);
     });
    }
    else if (req.query.tn) {
     return db.Team.findAll({where: {teamname: req.query.tn}})
     .then(function (teams) {
       res.json(teams);
     }).catch(function (err) {
       console.error(err);
     });
    }
    else {
      return db.Team.findAll().then(function (teams) {
        res.json(teams);
      }).catch(function (err) {
        console.error(err);
      });
    }
  },

  post: function (req, res) {
    return db.Team.create({
      teamname: req.body.teamname,
      leagueId: req.body.leagueid,
      wins: 0,
      losses: 0,
      ties: 0
    }).then(function (league) {
      res.sendStatus(201);
    })
    .catch(function (err) {
      console.error(err);
    });
  },

  put: function (req, res) {
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