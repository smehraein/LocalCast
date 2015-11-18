var Users = require('../models/userModel.js');
var url = require('url');
var Sequelize = require('sequelize');

module.exports = {
  get: function (req, res) {
    if (req.query.id) {
      return res.json(Users.getById(req.query.id));
    }
    else if (query.tid) {
     return res.json(Users.getByTeamId(req.query.tid)); 
    }
    else {
      return res.json(Users.getAll()); 
    }
  },
  post: function (req, res) {
    db.User.create({
      username: req.body.username,
      TeamId: req.body.teamid
    }).then(function(user) {
      res.sendStatus(201);
    })
    .catch(function (err) {
      console.error(err);
    });
  },
  put: function (req, res) {

  },
  delete: function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    if (query.id) {
      db.User.destroy({where: {id: query.id}})
      .then(function () {
        res.sendStatus(200);
      }).catch(function (err) {
        console.error(err);
      });
    }
    else if (query.tid) {
      db.User.destroy({where: {TeamId: query.tid}})
      .then(function () {
        res.sendStatus(200);
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
};