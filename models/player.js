var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PlayerSchema = new Schema ({
  name:  String,
  score: {type: Number, default: 0}
});

module.exports = mongoose.model('Player', PlayerSchema);
