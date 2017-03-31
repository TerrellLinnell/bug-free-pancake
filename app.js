const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/quiz');

const gameRoutes     = require('./routes/game');
const questionRoutes = require('./routes/questions');
const playerRoutes   = require('./routes/players');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 3000));

app.use('/api', gameRoutes);
app.use('/api', questionRoutes);
app.use('/api', playerRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
