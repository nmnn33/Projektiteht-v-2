//Minun itse tuomat moduulit, muuttujat jne..
const PORT = process.env.PORT || 8083; //Portti
var http = require('https');
var fs = require('fs');
// express generatorista valmiiksi tulleet moduulit
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//sisältävät polku logiikan javascriptillä
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); //express juttumme

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.pretty = true;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Polut
app.use('/', indexRouter); //basic polku
app.use('/users', usersRouter); //turha

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Port listener
app.listen(PORT, function () {
  console.log("Kuunnellaan porttia: " + PORT);
});
