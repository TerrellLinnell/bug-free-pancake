var express  = require('express');
var Game     = require('../models/game');
var Player   = require('../models/player');
var Game     = require('../models/game');
var Question = require('../models/question');

var Router = new express.Router();

Router.use(function (req, res, next) {
  return next();
});

Router.route('/:gameId/players')
.post(function (req, res) {
  var player = new Player ({
    name: req.body.name,
  })
  console.log(player);
  player.save(function (error, player) {
    if (error) {
      res.status(500).send(error, {message: 'there was an error saving this user'});
    } else {
      //look game up by id and add this players id oto the playrs array
      Game.findById(req.params.gameId, function (error, Game) {
        if (error) {
          res.status(500).send(error, {message: 'error finding a Game'});
        } else {
          Game.players.push(player._id)
          Game.save(function (error, Game) {
            if (error) {
              res.status(500).send(error, {message: 'error saving Game'});
            } else {
              res.json(Game)
            }
          })
        }
    })
  }
})
})
.put(function (req, res) {
player.findById(req.params.id, function (error, player) {
  if (error) {
    res.status(500).send(error, {message: 'Error finding player'});
  } else {
    player.name = req.body.name ? req.body.name : player.name;
    player.score = req.body.score ? req.body.score : player.score;
    player.save(function (error){
      if (error) {
        res.status(500).send(error, {message: 'error saving player to database'});
      } else {
        res.json({message: 'score updated'})
      }
    })
  }
})
})

module.exports = Router;
