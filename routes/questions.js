const express  = require('express');
const Game     = require('../models/game');
const Player   = require('../models/player');
const Question = require('../models/question');

const Router = new express.Router();

Router.use((req, res, next) => next());

Router.route('/questions')
  .post((req, res) => {
    const question = new Question ({
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
    question.save((error, question) => {
      if (error) {
        res.staus(500).send(error, {message: 'error saving question'});
      } else {
        res.json(question)
      }
    })
  })
  .get((req, res) => {
      Question.find((req.body.ActiveRound === req.body.Level), (error, questions) => {
        const Q = Math.floor(Math.random() * questions.length)
        if (error) {
          res.status(500).send(error, {message: 'error finding questions'});
        } else {
          res.json(questions[Q]);
        }
      })
})

Router.route('/questions/:round')
.post((req, res) => {
  const answered = JSON.parse(req.body.finished);
  Question.find({level: req.params.round, id: {$nin: answered}}, (error, questions) => {
    const Q = Math.floor(Math.random() * questions.length)
    if (error) {
      res.status(500).send(error, {message: 'error finding questions'});
    } else {
      res.json(questions[Q]);
    }
  })
})

Router.route('/questions/:questionId/')
.delete((req, res) => {
  Question.remove({_id: req.params.questionId}, (error) => {
    if (error) {
      res.status(500).send(error, {message: 'error deleting question'});
    } else {
      res.json({message: 'question deleted'});
    }
  })
})
.get((req, res) => {
  Question.findById({_id: req.params.questionId}, (error, data) => {
    if (error) {
      res.status(500).send(error, {message: 'Error getting question'});
    } else {
      res.json({data})
    }
  })
})

module.exports = Router;
