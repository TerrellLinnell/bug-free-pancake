var express = require('express');
var Question = require('../models/question');
var Game = require('../models/game');
var Player = require('../models/player');


var Router = new express.Router();


Router.route('/PLayer')
.Post(function (req, res) {
  var player = new Player {
    name: req.body.name;
    score: 0;
  }
});
player.save(function (err, player) {
  if (err) {
    rses.json({message: 'there was an error saving this user'})
  } else {
    res.json(player)
  }
});
.Put(function (req, res) {
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
