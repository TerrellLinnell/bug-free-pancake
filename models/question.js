var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema ({
  level: Number,
  question: String,
  answers: [
    {
      answer: String,
      correct: Boolean
    }
  ]
});

module.exports = mongoose.model('Question', QuestionSchema);
