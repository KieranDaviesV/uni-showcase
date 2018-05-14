const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// var cors = require('cors')

const index = require('./routes/index');
// const users = require('./routes/users');

const userAPI = require('./api/userAPI');
const gunAPI = require('./api/gunAPI');
const motorAPI = require('./api/motorAPI');
const gameAPI = require('./api/gameAPI');
const authenticationAPI = require('./api/authenticationAPI');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('superSecret', "TankTroop");

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
var dbHost = process.env.DB || "localhost";
var dbPort = process.env.DBPORT || "27017";
var dbRoute = process.env.DBROUTE || "RasPiTank-ZDB";

// The name of the database after the /
var dbUrl = `mongodb://${dbHost}:${dbPort}/${dbRoute}`;

// Create connection to mongodb server
mongoose.connect(dbUrl);

// On successful connection
mongoose.connection.on('connected', () => {
	console.log("Connected to database ");
});

// Error created when connecting
mongoose.connection.on('error', (Error) => {
	console.log("Database error ", Error);
});

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", " x-token-access, Origin, X-Requested-With, Content-Type, Accept");
	// res.header("")
	next();
});

// app.use(cors());

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/user', userAPI);
app.use('/api/gun', gunAPI);
app.use('/api/motor', motorAPI);
app.use('/api/game', gameAPI);
app.use('/api/authentication', authenticationAPI);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/**
 * Represents a book.
 * @constructor
 * @param {string} Hello - The title of the book.
 * @param {string} Goodbye - The author of the book.
 */

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
