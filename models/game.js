var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Game = new Schema ({
  ActiveRound: {type: Number, default: 1},
  Players: [
            {type: Schema.Types.ObjectId, ref:'Player'}
            ],
  Complete: {type: Boolean, default: false}
});

module.exports = mongoose.model('Game', Game);
