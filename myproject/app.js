var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var expressLayouts = require("express-ejs-layouts");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mobilesRouter = require('./routes/api/mobiles');
var adminRouter = require('./routes/admin');
var config = require('config');
var session = require('express-session')
var sessionAuth = require('./middleware/sessionAuth');
const adminAuth = require('./middleware/adminAuth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: "secrethai",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/',sessionAuth, indexRouter);
app.use('/users', usersRouter);
app.use('/mobiles', mobilesRouter);
app.use('/admin',adminAuth,adminRouter);
app.use(sessionAuth)

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

mongoose.connect(config.get("db"), { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
module.exports = app;
