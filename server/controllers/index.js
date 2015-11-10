var db = require('../db');
var url = require('url');
var Sequelize = require("sequelize");

module.exports = {

  leagues: {
    get: function (req, res) {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      if (query.id) {
        db.League.findById(query.id)
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
      
    }
  },

  teams: {
    get: function (req, res) {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      if (query.id) {
        db.Team.findAll({where: {leagueId: query.id}})
        .then(function (teams) {
          res.json(teams);
        }).catch(function (err) {
          console.error(err);
        });
      }
      else if (query.tid) {
       db.Team.findById(query.tid)
       .then(function (teams) {
          res.json(teams);
       }).catch(function (err) {
          console.error(err);
       });
      }
      else if (query.tn) {
       db.Team.findAll({where: {teamname: query.tn}})
       .then(function (teams) {
         res.json(teams);
       }).catch(function (err) {
         console.error(err);
       });
      }
      else {
        db.Team.findAll().then(function (teams) {
          res.json(teams);
        }).catch(function (err) {
          console.error(err);
        });
      }
    },

    post: function (req, res) {
      db.Team.create({
        teamname: req.body.teamname,
        leagueId: req.body.leagueid,
        rank: 0,
        wins: 0,
        losses: 0,
        ties: 0
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
      
    }
  },

  games: {
    get: function (req, res) {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      if (query.id) {
        db.Game.findAll({
          include: [db.Team],
          where: Sequelize.or(
          {TeamId: query.id},
          {team2Id: query.id})})
        .then(function (games) {
          res.json(games);
        }).catch(function (err) {
          console.log("ER");
          console.error(err);
        });
      }
      else {
        db.Game.findAll().then(function (games) {
          res.json(games);
        }).catch(function (err) {
          console.error(err);
        });
      }
    },

    post: function (req, res) {
      db.Game.create({
        TeamId: req.body.team1id,
        team2Id: req.body.team2id,
        team1score: req.body.team1score,
        team2score: req.body.team2score
      }).then(function(game) {
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
        db.Game.destroy({where: {id: query.id}})
        .then(function () {
          res.sendStatus(200);
        }).catch(function (err) {
          console.error(err);
        });
      }
      else if (query.tid) {
        db.Game.destroy({where: {TeamId: query.tid}})
        .then(function () {
          res.sendStatus(200);
        }).catch(function (err) {
          console.error(err);
        });
      }
    }
  },

  users: {
    get: function (req, res) {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      if (query.id) {
        db.User.findById(query.id)
        .then(function (user) {
          res.json(user.dataValues);
        }).catch(function (err) {
          console.error(err);
        });
      }
      else if (query.tid) {
       db.User.findAll({where: {teamId: query.tid}})
       .then(function (users) {
         res.json(users);
       }).catch(function (err) {
         console.error(err);
       }); 
      }
      else {
        db.User.findAll().then(function (users) {
          res.json(users);
        }).catch(function (err) {
          console.error(err);
        });
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
  }
};