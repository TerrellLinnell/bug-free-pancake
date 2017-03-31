var express  = require('express');
var Game     = require('../models/game');
var Player   = require('../models/player');
var Game     = require('../models/game');
var Question = require('../models/question');

var Router = new express.Router();

Router.use(function (req, res, next) {
  return next();
});

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
    question.save(function (error, question) {
      if (error) {
        res.staus(500).send(error, {message: 'error saving question'});
      } else {
        res.json(question)
      }
    })
  })
  .get(function (req, res) {
      Question.find((req.body.ActiveRound === req.body.Level), function (error, questions) {
        var Q = Math.floor(Math.random() * questions.length)
        if (error) {
          res.status(500).send(error, {message: 'error finding questions'});
        } else {
          res.json(questions[Q]);
        }
      })
})

Router.route('/questions/:round').post(function (req, res) {
  var answered = JSON.parse(req.body.finished);
  console.log(answered);
  Question.find({level: req.params.round, id: {$nin: answered}}, function (error, questions) {
    console.log(questions.length);
    var Q = Math.floor(Math.random() * questions.length)
    if (error) {
      res.status(500).send(error, {message: 'error finding questions'});
    } else {
      res.json(questions[Q]);
    }
  })
})

Router.route('/questions/:questionId/')
.delete(function (req, res) {
  Question.remove({_id: req.params.questionId}, function (error) {
    if (error) {
      res.status(500).send(error, {message: 'error deleting question'});
    } else {
      res.json({message: 'question deleted'});
    }
  })
})
.get(function (req, res) {
  Question.findById({_id: req.params.questionId}, function (error, data) {
    if (error) {
      res.status(500).send(error, {message: 'Error getting question'});
    } else {
      res.json({data})
    }
  })
})

module.exports = Router;
