const mongoose = require('mongoose');
const User   = require('../models/user'); // get our mongoose model
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file

// routes
module.exports.testing = (req,res,next) =>{
    res.send('Hello! The API is testing');
}
module.exports.dataInsert = (req,res,next) =>{
// create a sample user
	var users = new User({ 
        name: 'rahul', 
        email: 'sho12@gmail.com',
		password: '123456' 
	});
	users.save(function(err) {
		if (err) throw err;
		console.log('User saved successfully');
		res.json({ success: true });
	});
}
// authentication 

module.exports.authenticate = (req,res,next) =>{
    console.log(req.body);
    // find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var payload = {
					admin: user.admin	
				}
				var token = jwt.sign(payload, config.secret, {
					expiresIn: 86400 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		
		}
	});
}

// route middleware to authenticate and check token
module.exports.tokenTest = (req,res,next) =>{
    	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
                next();
                res.json("authenticate");
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
}
// authenticated routes
module.exports.test = (req,res,next) =>{
    res.json({ message: 'Welcome to the coolest API on earth!' });
}
module.exports.users = (req,res,next) =>{
    User.find({}, function(err, users) {
		res.json(users);
	});
}
module.exports.check = (req,res,next) =>{
    res.json(req.decoded);
}
