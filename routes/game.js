var express = require('express');
var Player = require('../models/player');

var Router = new express.Router();

Router.use(function (req, res, next) {
  return next();
});

Router.route('/')
  .get(function(req, res){
    Player.find()
      .populate({
        path:'name'
      })
      .exec(function(err, players){
        if (err) {
          res.json(err, 'ERROR');
        } else {
          res.json(players);
        }
      });
  })

module.exports = Router;
