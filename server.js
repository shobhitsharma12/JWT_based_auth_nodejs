// get the packages we need
var express 	= require('express');
var app         = express();
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');

var config = require('./config'); // get our config file

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var rtsIndex = require('./app/routes/index.router');

//middleware
app.use('/api',rtsIndex);

// configuration 
var port = process.env.PORT || 9000; // used to create, sign, and verify tokens
mongoose.connect(config.database, { useNewUrlParser: true }); // connect to database
app.set('superSecret', config.secret); // secret variable

// use morgan to log requests to the console
app.use(morgan('dev'));

// start the serve
app.listen(port);
console.log('Magic happens at http://localhost:' + port);