var express = require('express');
var Game = require('../models/game');
var Player = require('../models/player');

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
      .exec(function(err, players){
        if (err) {
          res.json(err, 'ERROR');
        } else {
          res.json(players);
        }
      });
  })
  .post(function(req, res){
    var game = new Game({
      activeRound: 0,
      playeres: req.body,
      complete: 0
    });
    game.save(function(err, game){
      if (err) {
        res.json({ message: 'there was an error saving the game' });
      } else {
        res.json(game);
      }
    });
  })

module.exports = Router;
