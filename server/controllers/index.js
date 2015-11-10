var db = require('../db');
var url = require('url');

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
    }
  },

  games: {
    get: function (req, res) {
      if (req.body.teamid) {
        db.Game.findAll({where: Sequelize.or(
          {team1: req.body.teamid},
          {team2: req.body.teamid})})
        .then(function (games) {
          res.json(games);
        }).catch(function (err) {
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
        team1: req.body.team1id,
        team2: req.body.team2id,
        team1score: req.body.team1score,
        team2score: req.body.team2score
      }).then(function(game) {
        res.sendStatus(201);
      })
      .catch(function (err) {
        console.error(err);
      });
    }
  },

  users: {
    get: function (req, res) {
      if (req.body.userid) {
        db.User.findById(req.body.userid)
        .then(function (user) {
          res.json(user.dataValues);
        }).catch(function (err) {
          console.error(err);
        });
      }
      else if (req.body.teamid) {
       db.User.findAll({where: {teamId: req.body.teamid}})
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
    }
  }
};