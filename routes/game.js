var express = require('express');
var Game = require('../models/game');
var Player = require('../models/player');
var Game = require('../models/game');
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

Router.route('/games')
.post(function (req, res) {
  var game = new Game ()
  game.save(function (err, game) {
    if (err) {
      res.json({message: 'error saving game'})
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
    .exec(function (err, game) {
      if (err) {
        res.json(err, 'ERROR');
      } else {
        res.json(game)
      }
    })
})

Router.route('/questions')
.post(function (req, res) {
  var question = new Question ({
    level: req.body.level,
    question: req.body.question,
    answers: [
      {
        answer: req.body.answer,
        correct: req.body.correct
      },
      {
        answer: req.body.answer2,
        correct: req.body.correct2
      },
      {
        answer: req.body.answer3,
        correct: req.body.correct3
      },
      {
        answer: req.body.answer4,
        correct: req.body.correct4
      }
    ]
  })
  question.save(function (err, question) {
    if (err) {
      res.json({message: 'error saving question'})
    } else {
      res.json(question)
    }
  })
})
.get(function (req, res) {
    Question.find((req.body.ActiveRound === req.body.Level), function (err, questions) {
      var Q = Math.floor(Math.random() * questions.length)
      if (err) {
        res.json({message: 'error finding questions'})
      } else {
        res.json(questions[Q]);
      }
    })
})

Router.route('/questions/:questionId/')
.delete(function (req, res) {
  Question.remove({_id: req.params.questionId}, function (err) {
    if (err) {
      res.json({message: 'error deleting question'});
    } else {
      res.json({message: 'question deleted'});
    }
  })
})
.get(function (req, res) {
  Question.findById({_id: req.params.questionId}, function (err, data) {
    if (err) {
      res.json({message: 'Error getting question'})
    } else {
      res.json({data})
    }
  })
})

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
