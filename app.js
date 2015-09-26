var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var articles = require("./routes/articles");
var profiles = require("./routes/profiles");
var index = require("./routes/index");

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


/*var starterAccount = new Account({email: "soufiane.eb@email.com", password: "123456"});
var starterProfile = new Profile({name: "Soufiane ELBAZ", age: 23, account: starterAccount._id});
var starterArticle1 = new Article(
{
  account: starterAccount._id, 
  content: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat sed justo non mattis. Quisque euismod, ex eu accumsan pulvinar, augue nunc porttitor purus, sit amet placerat nibh purus nec magna. Cras lacinia mauris quis dui fringilla varius. Integer in facilisis purus. Vivamus hendrerit nulla sit amet dolor luctus, posuere interdum ante semper. Nullam finibus lacus et orci molestie varius. Phasellus vulputate nulla arcu, et sollicitudin velit eleifend eu. Donec mattis metus non ligula dignissim, at iaculis est elementum. Vivamus convallis, justo quis cursus vestibulum, nulla massa pharetra ante, eu bibendum risus metus eget diam. Aenean sed accumsan mi. Ut iaculis a dolor sit amet imperdiet. Integer pharetra sodales feugiat. In hac habitasse platea dictumst. Duis in mauris consequat, commodo justo cursus, mollis justo. Nam vehicula nisi libero, vitae mollis nisi tristique et.Nullam et mi purus. In hendrerit ultricies magna non malesuada. Nam mattis risus vel massa finibus laoreet. Phasellus a fringilla sapien. Nullam blandit rhoncus tellus at suscipit. Mauris maximus urna id orci fringilla eleifend. Sed blandit, purus ut ultrices elementum, libero nulla tempus ante, vitae accumsan metus turpis eu massa. Curabitur ut bibendum elit, eu ultrices nibh. Vestibulum in leo a leo rhoncus facilisis. ", 
  title: "Lorem Ipsum"
});

var starterArticle2 = new Article(
{
  account: starterAccount._id, 
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat sed justo non mattis. Quisque euismod, ex eu accumsan pulvinar, augue nunc porttitor purus, sit amet placerat nibh purus nec magna. Cras lacinia mauris quis dui fringilla varius. Integer in facilisis purus. Vivamus hendrerit nulla sit amet dolor luctus, posuere interdum ante semper. Nullam finibus lacus et orci molestie varius. Phasellus vulputate nulla arcu, et sollicitudin velit eleifend eu. Donec mattis metus non ligula dignissim, at iaculis est elementum. Vivamus convallis, justo quis cursus vestibulum, nulla massa pharetra ante, eu bibendum risus metus eget diam. Aenean sed accumsan mi. Ut iaculis a dolor sit amet imperdiet. Integer pharetra sodales feugiat. In hac habitasse platea dictumst. Duis in mauris consequat, commodo justo cursus, mollis justo. Nam vehicula nisi libero, vitae mollis nisi tristique et.Nullam et mi purus. In hendrerit ultricies magna non malesuada. Nam mattis risus vel massa finibus laoreet. Phasellus a fringilla sapien. Nullam blandit rhoncus tellus at suscipit. Mauris maximus urna id orci fringilla eleifend. Sed blandit, purus ut ultrices elementum, libero nulla tempus ante, vitae accumsan metus turpis eu massa. Curabitur ut bibendum elit, eu ultrices nibh. Vestibulum in leo a leo rhoncus facilisis. ", 
  title: "Lorem Ipsum"
});

var starterArticle3 = new Article(
{
  account: starterAccount._id, 
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat sed justo non mattis. Quisque euismod, ex eu accumsan pulvinar, augue nunc porttitor purus, sit amet placerat nibh purus nec magna. Cras lacinia mauris quis dui fringilla varius. Integer in facilisis purus. Vivamus hendrerit nulla sit amet dolor luctus, posuere interdum ante semper. Nullam finibus lacus et orci molestie varius. Phasellus vulputate nulla arcu, et sollicitudin velit eleifend eu. Donec mattis metus non ligula dignissim, at iaculis est elementum. Vivamus convallis, justo quis cursus vestibulum, nulla massa pharetra ante, eu bibendum risus metus eget diam. Aenean sed accumsan mi. Ut iaculis a dolor sit amet imperdiet. Integer pharetra sodales feugiat. In hac habitasse platea dictumst. Duis in mauris consequat, commodo justo cursus, mollis justo. Nam vehicula nisi libero, vitae mollis nisi tristique et.Nullam et mi purus. In hendrerit ultricies magna non malesuada. Nam mattis risus vel massa finibus laoreet. Phasellus a fringilla sapien. Nullam blandit rhoncus tellus at suscipit. Mauris maximus urna id orci fringilla eleifend. Sed blandit, purus ut ultrices elementum, libero nulla tempus ante, vitae accumsan metus turpis eu massa. Curabitur ut bibendum elit, eu ultrices nibh. Vestibulum in leo a leo rhoncus facilisis. ", 
  title: "Lorem Ipsum"
});

var starterArticle4 = new Article(
{
  account: starterAccount._id, 
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat sed justo non mattis. Quisque euismod, ex eu accumsan pulvinar, augue nunc porttitor purus, sit amet placerat nibh purus nec magna. Cras lacinia mauris quis dui fringilla varius. Integer in facilisis purus. Vivamus hendrerit nulla sit amet dolor luctus, posuere interdum ante semper. Nullam finibus lacus et orci molestie varius. Phasellus vulputate nulla arcu, et sollicitudin velit eleifend eu. Donec mattis metus non ligula dignissim, at iaculis est elementum. Vivamus convallis, justo quis cursus vestibulum, nulla massa pharetra ante, eu bibendum risus metus eget diam. Aenean sed accumsan mi. Ut iaculis a dolor sit amet imperdiet. Integer pharetra sodales feugiat. In hac habitasse platea dictumst. Duis in mauris consequat, commodo justo cursus, mollis justo. Nam vehicula nisi libero, vitae mollis nisi tristique et. et mi purus. In hendrerit ultricies magna non malesuada. Nam mattis risus vel massa finibus laoreet. Phasellus a fringilla sapien. Nullam blandit rhoncus tellus at suscipit. Mauris maximus urna id orci fringilla eleifend. Sed blandit, purus ut ultrices elementum, libero nulla tempus ante, vitae accumsan metus turpis eu massa. Curabitur ut bibendum elit, eu ultrices nibh. Vestibulum in leo a leo rhoncus facilisis. ", 
  title: "Lorem Ipsum"
});

var starterArticle5 = new Article(
{
  account: starterAccount._id, 
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat sed justo non mattis. Quisque euismod, ex eu accumsan pulvinar, augue nunc porttitor purus, sit amet placerat nibh purus nec magna. Cras lacinia mauris quis dui fringilla varius. Integer in facilisis purus. Vivamus hendrerit nulla sit amet dolor luctus, posuere interdum ante semper. Nullam finibus lacus et orci molestie varius. Phasellus vulputate nulla arcu, et sollicitudin velit eleifend eu. Donec mattis metus non ligula dignissim, at iaculis est elementum. Vivamus convallis, justo quis cursus vestibulum, nulla massa pharetra ante, eu bibendum risus metus eget diam. Aenean sed accumsan mi. Ut iaculis a dolor sit amet imperdiet. Integer pharetra sodales feugiat. In hac habitasse platea dictumst. Duis in mauris consequat, commodo justo cursus, mollis justo. Nam vehicula nisi libero, vitae mollis nisi tristique et.Nullam et mi purus. In hendrerit ultricies magna non malesuada. Nam mattis risus vel massa finibus laoreet. Phasellus a fringilla sapien. Nullam blandit rhoncus tellus at suscipit. Mauris maximus urna id orci fringilla eleifend. Sed blandit, purus ut ultrices elementum, libero nulla tempus ante, vitae accumsan metus turpis eu massa. Curabitur ut bibendum elit, eu ultrices nibh. Vestibulum in leo a leo rhoncus facilisis. ", 
  title: "Lorem Ipsum"
});

starterAccount.articles.push(
  starterArticle1._id,
  starterArticle2._id,
  starterArticle3._id,
  starterArticle4._id,
  starterArticle5._id);
starterAccount.save(callback);
starterArticle1.save(callback);
starterArticle2.save(callback);
starterArticle3.save(callback);
starterArticle4.save(callback);
starterArticle5.save(callback);
starterProfile.save(callback);




*/

// view engine setup
app.set('views', path.join(__dirname, 'partials'));
app.set('view engine', 'jade');

app.get('/partials/:partial_name', function(req, res){
  console.log("IN");
  console.log(req.params);
  res.render(req.params.partial_name);
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', index);
app.use('/articles', articles);
app.use('/profiles', profiles);

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
