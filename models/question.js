var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Question = new Schema ({
  Level: Number,
  Question: String,
  Answers: [
    {
      Answer: String,
      Correct: Boolean
    }
  ]
});

module.exports = mongoose.model('Question', Question);
