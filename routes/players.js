const express  = require('express');
const Game     = require('../models/game');
const Player   = require('../models/player');
const Question = require('../models/question');

const Router = new express.Router();

Router.use((req, res, next) => next());

Router.route('/:gameId/players')
.post((req, res) => {
  const player = new Player ({
    name: req.body.name,
  })
  player.save((error, player) => {
    if (error) {
      res.status(500).send(error, {message: 'there was an error saving this user'});
    } else {
      Game.findById(req.params.gameId, (error, Game) => {
        if (error) {
          res.status(500).send(error, {message: 'error finding a Game'});
        } else {
          Game.players.push(player._id)
          Game.save((error, Game) => {
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
.put((req, res) => {
  player.findById(req.params.id, (error, player) => {
    if (error) {
      res.status(500).send(error, {message: 'Error finding player'});
    } else {
      player.name = req.body.name ? req.body.name : player.name;
      player.score = req.body.score ? req.body.score : player.score;
      player.save((error) => {
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
