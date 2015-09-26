var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();


//connecting to our MongoDB Server
mongoose.connect('mongodb://localhost/test3');


var Profile = require('./models/Profiles.js');
var Account = require('./models/Accounts.js');
var Article = require('./models/Articles.js');
var callback = function(err,data) {
  if(err)
    console.log("Erreur : "+err);
  else
  {
    console.log(data);
  }
};
var starterAccount = new Account({email: "John.DOE.@gmail.com", password: "123456"});
var starterProfile = new Profile({name: "John DOE", age: 23, account: starterAccount._id});
var starterArticle = new Article({account: starterAccount._id});
starterArticle.content = "this is the content";
starterArticle.title = "this is the title";
starterAccount.articles.push(starterArticle._id);
starterAccount.save(callback);
starterArticle.save(callback);
starterProfile.save(callback);





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
