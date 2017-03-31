const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PlayerSchema = new Schema ({
  name:  String,
  score: {type: Number, default: 0}
});

module.exports = mongoose.model('Player', PlayerSchema);
