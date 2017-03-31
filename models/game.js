const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const GameSchema = new Schema ({
  activeRound: {type: Number, default: 1},
  players:     [
                {type: Schema.Types.ObjectId, ref:'Player'}
               ],
  complete:    {type: Boolean, default: false}
});

module.exports = mongoose.model('Game', GameSchema);
