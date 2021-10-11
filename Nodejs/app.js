var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { Authenticate } = require('./src/midlewares/authMiddleware');
var airportRouter = require('./routes/airportRouter');
var aircraftRouter = require('./routes/aircraftRouter');
var usersRouter = require('./routes/userRouter');
var reportRouter = require('./routes/reportRouter');
var transactionRuter = require('./routes/transRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Frame-Options', 'deny');
  res.header('X-Content-Type-Options', 'nosniff');
  next();
});
app.disable("x-powered-by");

process.on('warning', e => console.warn(e.stack));
process.on('uncaughtException', function(err, next) {
  console.error('Uncaught Exception');
  console.error(err);
});

app.use('*',Authenticate);

// include router files.
app.use('/', usersRouter);
app.use('/airport', airportRouter);
app.use('/aircraft', aircraftRouter);
app.use('/reports', reportRouter);
app.use('/transactions/', transactionRuter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
