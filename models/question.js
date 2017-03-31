const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const QuestionSchema = new Schema ({
  level:    Number,
  question: String,
  answers: [
            {
              answer: String,
              correct: Boolean
            }
          ]
});

module.exports = mongoose.model('Question', QuestionSchema);
