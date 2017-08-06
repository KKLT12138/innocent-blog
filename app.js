var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'home')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.use('/', index);
// app.use('/users', users);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, X-Access-Token');
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
  next();
});

app.use(session({
  secret: 'helloworld',
  resave: true,
  saveUninitialized: true,
  verify: ''
  // username: ''
}));

app.use('/api/user', require('./api/user/data'));
app.use('/api/user', require('./api/user/friend'));
app.use('/api/user', require('./api/user/statistics'));

app.use('/admin', require('./api/login'));
app.use('/api/admin', require('./api/admin/category'));
app.use('/api/admin', require('./api/admin/tag'));
app.use('/api/admin', require('./api/admin/adminuser'));
app.use('/api/admin', require('./api/admin/post'));
app.use('/api/admin', require('./api/admin/friend'));
app.use('/api/admin', require('./api/admin/key'));

// catch 404 and forward to error handler
app.use(function(req, res) {
  // res.type('text/plain');
  res.status(404);
  res.render('404');
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
