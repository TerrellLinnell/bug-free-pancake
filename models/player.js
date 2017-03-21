var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Player = new Schema ({
  name: String,
  Score: {type: Number, default: 0}
});

module.exports = mongoose.model('Player', Player);
