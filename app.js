var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var sendsmsRouter = require('./routes/sendsms');
var querymsgRouter = require('./routes/querymsg');
var listRouter = require('./routes/list');
var addcontactsRouter = require('./routes/addcontacts');
var campaignRouter = require('./routes/campaign');
var campstatusRouter = require('./routes/campstatus');
var pingRouter = require('./routes/ping');
var makecallRouter = require('./routes/makecall');
var querycallRouter = require('./routes/querycall');
var incoming_sms_infoRouter = require('./routes/incoming_sms_info');
var pending_unpaid_sms_actionRouter = require('./routes/pending_unpaid_sms_action');
var get_incoming_messagesRouter = require('./routes/get_incoming_messages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/', authRouter );
app.use('/auth', authRouter);
app.use('/sendsms', sendsmsRouter);
app.use('/querymsg', querymsgRouter);
app.use('/list', listRouter);
app.use('/addcontacts', addcontactsRouter);
app.use('/campaign', campaignRouter);
app.use('/campstatus', campstatusRouter);
app.use('/ping', pingRouter);
app.use('/makecall', makecallRouter);
app.use('/querycall', querycallRouter);
app.use('/incoming_sms_info', incoming_sms_infoRouter);
app.use('/pending_unpaid_sms_action', pending_unpaid_sms_actionRouter);
app.use('/get_incoming_messages', get_incoming_messagesRouter);
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

module.exports = app;

