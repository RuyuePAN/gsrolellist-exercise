var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var authApiRouter = require('./routes/api/auth');
var roleApiRouter = require('./routes/api/role');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dbconfig = require('./config/config');
const webAuthRouter = require("./routes/web/auth");
const webRoleRouter = require("./routes/web/role");

var app = express();


// 设置中间件（session存储在数据库）
app.use(session({
  name: 'sid',   // 设置cookie的name，默认值
  secret: `${dbconfig.secret}`,  // 参与加密的字符串（又称签名） 加盐
  saveUninitialized: false,  // 是否为每次请求都设置一个cookie用来存储session的id
  resave: true,   // 是否在每次请求时重新保存session
  store: MongoStore.create({
    mongoUrl:`mongodb://${dbconfig.DBHOST}:${dbconfig.DBPORT}/${dbconfig.DBNAME}`
  }),
  cookie:{
    httpOnly: true,  // 开启后前端无法通过js操作
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7天有效
  }

}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 设置静态资源中间件
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', webAuthRouter);
app.use('/', webRoleRouter);
app.use('/api', authApiRouter);
app.use('/api', roleApiRouter);


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
