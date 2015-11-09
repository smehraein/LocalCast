var models = require('../models');

module.exports = {

  leagues: {
    get: function (req, res) {
      if (req.body.leagueid) {
        models.leagues.getOne(req.body.leagueid, function(err, results) {
          if (err) { console.error(err); }
          res.json(results);
        });
      }
      else {
        models.leagues.getAll(function(err, results) {
          if (err) { console.error(err); }
          res.json(results);
        });
      }
    },
    post: function (req, res) {
      var params = [req.body.leaguename, req.body.leaguesport];
      models.leagues.post(params, function(err, results) {
        if (err) { console.error(err); }
        res.sendStatus(201);
      });
    }
  },

  teams: {
    get: function (req, res) {
      if (req.body.teamid) {
        models.teams.getOne(req.body.teamid, function(err, results) {
          if (err) { console.error(err); }
          res.json(results);
        });
      }
      else if (req.body.leagueid) {
        models.teams.getFromLeague(req.body.leagueid, function(err, results) {
          if (err) { console.error(err); }
          res.json(results);
        });
      }
      else {
        models.teams.getAll(function(err, results) {
          if (err) { console.error(err); }
          res.json(results);
        });
      }
    },
    post: function (req, res) {
      var params = [req.body.teamname, req.body.leaguename];
      models.teams.post(params, function(err, results) {
        if (err) { console.error(err); }
        res.sendStatus(201);
      });
    }
  },

  games: {
    get: function (req, res) {
      if (req.body.gameid) {
        models.games.getOne(req.body.gameid, function(err, results) {
          if (err) { console.error(err); }
          res.json(results);
        });
      }
      else if (req.body.teamid) {
        models.games.getFromTeam(req.body.teamid, function(err, results) {
          if (err) { console.error(err); }
          res.json(results);
        });
      }
      else if (req.body.leagueid) {
        models.games.getFromLeague(req.body.leagueid, function(err, results) {
          if (err) { console.error(err); }
          res.json(results);
        });
      }
      else {
        models.games.getAll(function(err, results) {
          if (err) { console.error(err); }
          res.json(results);
        });
      }
    },
    post: function (req, res) {
      var params = [req.body.team1id, req.body.team2id, req.body.team1score, req.body.team2score];
      models.games.post(params, function(err, results) {
        if (err) { console.error(err); }
        res.sendStatus(201);
      });
    }
  },

  users: {
    get: function (req, res) {
      if (req.body.userid) {
        models.users.getOne(req.body.userid, function(err, results) {
          if (err) { console.error(err); }
          res.json(results);
        });
      }
      else {
        models.users.get(function(err, results) {
        if (err) { console.error(err); }
        res.json(results);
        });
      }
    },
    post: function (req, res) {
      var params = [req.body.username];
      models.users.post(params, function(err, results) {
        if (err) { console.error(err); }
        res.sendStatus(201);
      });
    }
  }
};