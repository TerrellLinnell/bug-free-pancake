var express = require('express');
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
      path: 'Players',
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
    Level: req.body.Level,
    Question: req.body.Question,
    Answers: [
      {
        Answer: req.body.Answer,
        Correct: req.body.Correct
      },
      {
        Answer: req.body.Answer2,
        Correct: req.body.Correct2
      },
      {
        Answer: req.body.Answer3,
        Correct: req.body.Correct3
      },
      {
        Answer: req.body.Answer4,
        Correct: req.body.Correct4
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
      var Q = Math.round(Math.random() * questions.length)
      if (err) {
        res.json({message: 'error finding questions'})
      } else {
        res.json(questions[Q]);
      }
    })
})

Router.route('/questions/:questionId')
.delete(function (req, res) {
  Question.remove({_id: req.params.questionId}, function (err) {
    if (err) {
      res.json({message: 'error deleting question'});
    } else {
      res.json({message: 'question deleted'});
    }
  })
})
  Router.route('/:gameId/players')
  .post(function (req, res) {
    var player = new Player ({
      name: req.body.name,
    })
    player.save(function (err, player) {
      if (err) {
        res.json({message: 'there was an error saving this user'})
      } else {
        //look game up by id and add this players id oto the playrs array
        Game.findById(req.params.gameId, function (err, Game) {
          if (err) {
            res.json({message: 'error finding a Game'})
          } else {
            Game.Players.push(player._id)
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
