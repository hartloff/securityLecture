var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/security');

var collention_users = db.get("users");


router.get('/', function (req, res, next) {
	res.render("index");
});


router.post('/register', function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	var salt = bcrypt.genSaltSync();
	var hash = bcrypt.hashSync(password, salt);

	collention_users.insert({username: username, password: hash}, function (err) {
		if (err) {
			res.render("index", {message: "error"});
		} else {
			res.render("index", {message: username + " registered"});
		}
	});

});


router.post('/login', function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	collention_users.findOne({username: username}, {}, function (err, record) {
		if (err) {
			res.render("index", {message: "error"});
		} else if (!record) {
			res.render("index", {message: "username " + username + " not registered"});
		}else{
			if(bcrypt.compareSync(password, record.password)){
				res.render("index", {message: "logged in as " + username + "!"});
			}else{
				res.render("index", {message: "wrong password"});
			}
		}
	});

});


module.exports = router;