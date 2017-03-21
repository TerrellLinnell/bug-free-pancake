var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Player = new Schema ({
  name: String,
  Score: Number
});

module.exports = mongoose.model('PLayer', Player);
