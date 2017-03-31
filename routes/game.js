const express  = require('express');
const Game     = require('../models/game');
const Player   = require('../models/player');
const Question = require('../models/question');

const Router = new express.Router();

Router.use((req, res, next) => next());

Router.route('/')
  .get((req, res) => {
    Player.find()
      .populate({
        path:'name'
      })
      .exec((error, players) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.json(players);
        }
      });
  })
  .post((req, res) => {
    const game = new Game({
      activeRound: 0,
      players: req.body,
      complete: 0
    });
    game.save((error, game) => {
      if (error) {
        res.status(500).send(error, { message: 'there was an error saving the game' });
      } else {
        res.json(game);
      }
    });
  })

Router.route('/games')
.post((req, res) => {
  const game = new Game ()
  game.save((error, game) => {
    if (error) {
      res.status(500).send(error, {message: 'error saving game'});
    } else {
      res.json(game)
    }
  })
})

Router.route('/games/:gameId')
.get((req, res) => {
  Game.findById(req.params.gameId)
    .populate({
      path: 'players',
    })
    .exec((error, game) => {
      if (error) {
        res.status(500).send(error, {message: 'Error getting game by Id'});
      } else {
        res.json(game)
      }
    })
})

module.exports = Router;
