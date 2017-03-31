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
  player.save(function (err, player) {
    if (err) {
      res.json({message: 'there was an error saving this user'})
    } else {
      //look game up by id and add this players id oto the playrs array
      Game.findById(req.params.gameId, function (err, Game) {
        if (err) {
          res.json({message: 'error finding a Game'})
        } else {
          console.log('before', Game.players);
          Game.players.push(player._id)
          console.log('after', Game.players);
          Game.save(function (err, Game) {
            if (err) {
              res.json({message: 'error saving Game'})
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
player.findById(req.params.id, function (err, player) {
  if (err) {
    res.json({message: 'Error finding player'})
  } else {
    player.name = req.body.name ? req.body.name : player.name;
    player.score = req.body.score ? req.body.score : player.score;
    player.save(function (err){
      if (err) {
        res.json(err);
      } else {
        res.json({message: 'score updated'})
      }
    })
  }
})
})

module.exports = Router;
