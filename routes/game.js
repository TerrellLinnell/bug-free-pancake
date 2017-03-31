var express  = require('express');
var Game     = require('../models/game');
var Player   = require('../models/player');
var Game     = require('../models/game');
var Question = require('../models/question');

var Router = new express.Router();

Router.use(function (req, res, next) {
  return next();
});

Router.route('/')
  .get(function(req, res){
    Player.find()
      .populate({
        path:'name'
      })
      .exec(function(error, players){
        if (error) {
          res.status(500).send(error);
        } else {
          res.json(players);
        }
      });
  })
  .post(function(req, res){
    var game = new Game({
      activeRound: 0,
      players: req.body,
      complete: 0
    });
    game.save(function(error, game){
      if (error) {
        res.status(500).send(error, { message: 'there was an error saving the game' });
      } else {
        res.json(game);
      }
    });
  })

Router.route('/games')
.post(function (req, res) {
  var game = new Game ()
  game.save(function (error, game) {
    if (error) {
      res.status(500).send(error, {message: 'error saving game'});
    } else {
      res.json(game)
    }
  })
})

Router.route('/games/:gameId')
.get(function (req, res) {
  Game.findById(req.params.gameId)
    .populate({
      path: 'players',
    })
    .exec(function (error, game) {
      if (error) {
        res.status(500).send(error, {message: 'Error getting game by Id'});
      } else {
        res.json(game)
      }
    })
})

module.exports = Router;
