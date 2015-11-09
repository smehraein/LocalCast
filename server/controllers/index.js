var db = require('../db');

module.exports = {

  leagues: {
    get: function (req, res) {
      if (req.body.leaguename) {
        db.League.findOne({where: {leaguename: req.body.leaguename}})
        .then(function (league) {
          res.json(league);
        }).catch(function (err) {
          console.error(err);
        });
      }
      else {
        db.League.findAll().then(function (leagues) {
          res.json(league);
        }).catch(function (err) {
          console.error(err);
        });
      }
    },

    post: function (req, res) {
      db.League.create({
        leaguename: req.body.leaguename
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
      if (req.body.teamid) {
        db.Team.findById(req.body.teamid)
        .then(function (team) {
          res.json(team);
        }).catch(function (err) {
          console.error(err);
        });
      }
      else if (req.body.leagueid) {
        db.Team.findAll({where: {leagueId: req.body.leagueid}})
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
        leagueId: req.body.leagueId
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
      if (req.body.gameid) {
        db.Game.findById(req.body.gameid)
        .then(function (game) {
          res.json(game);
        }).catch(function (err) {
          console.error(err);
        });
      }
      else if (req.body.teamid) {
        db.Game.findAll({where: Sequelize.or(
          {team1: req.body.teamid},
          {team2: req.body.teamid})})
        .then(function (games) {
          res.json(games);
        }).catch(function (err) {
          console.error(err);
        });
      }
      else if (req.body.leagueid) {
        db.Game.findAll({where: {leagueId: req.body.leagueid}})
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
          res.json(user);
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
        username: req.body.username
      }).then(function(user) {
        res.sendStatus(201);
      })
      .catch(function (err) {
        console.error(err);
      });
    }
  }
};