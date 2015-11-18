var db = require('../db');
var url = require('url');
var Sequelize = require('sequelize');

module.exports = {
  get: function (req, res) {
      if (req.query.id) {
        db.League.findById(req.query.id)
        .then(function (league) {
          res.json(league);
        }).catch(function (err) {
          console.error(err);
        });
      }
      else {
        db.League.findAll().then(function (leagues) {
          res.json(leagues);
        }).catch(function (err) {
          console.error(err);
        });
      }
    },

    post: function (req, res) {
      db.League.create({
        leaguename: req.body.leaguename,
        sport: req.body.sport
      }).then(function(league) {
        res.sendStatus(201);
      })
      .catch(function (err) {
      console.error(err);
      });
    },
    put: function (req, res) {

    },
    delete: function (req, res) {
      if (req.query.id) {
        db.League.destroy({where: {id: req.query.id}})
        .then(function () {
          res.sendStatus(200);
        }).catch(function (err) {
          console.error(err);
        });
      }
      else {
        res.sendStatus(404);
      }
    }
};
