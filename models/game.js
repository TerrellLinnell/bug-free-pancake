var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Game = new Schema ({
  ActiveRound: Number,
  Players: [
            {type: Schema.Types.ObjectId, ref:'Player'}
            ],
  Complete: Boolean
});

module.exports = mongoose.model('Game', Game);
