var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const session = require('express-session');
var sessionverif = require('./middleware/sessionverif')
var alertmanager = require('./middleware/alert')

// Routes
var homeRouter = require('./routes/home');
var searchRouter = require('./routes/search');
var postRouter = require('./routes/post');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var emailRouter = require('./routes/email');
var passwordRouter = require('./routes/password');
var phoneRouter = require('./routes/phone');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/petsfinder', { useNewUrlParser: true });
var db = mongoose.connection;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'fakepassword', resave: false, saveUninitialized: true }));
app.use(alertmanager.alertManager);

// Middleware protecting route that require authentification
app.use('/post', sessionverif.sessionRedirect);
app.use('/user', sessionverif.sessionRedirect);
app.use('/email', sessionverif.sessionRedirect);
app.use('/password', sessionverif.sessionRedirect);
app.use('/phone', sessionverif.sessionRedirect);

//  Route
app.use('/', homeRouter);
app.use('/search', searchRouter);
app.use('/post', postRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/email', emailRouter);
app.use('/password', passwordRouter);
app.use('/phone', phoneRouter);


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
  res.render('error');
});

module.exports = app;
