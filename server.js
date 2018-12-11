// get the packages we need
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User   = require('./app/models/user'); // get our mongoose model

// configuration 
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect("mongodb://localhost:27017/MEANStackDB", { useNewUrlParser: true });
app.set('superSecret', 'shobhitsharma'); // secret variable

