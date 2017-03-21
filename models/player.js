import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var Player = new Schema ({
  name: String,
  Score: Number
});

module.exports = mongoose.model('PLayer', Player);
