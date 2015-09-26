var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Account = require('../models/Accounts.js');
var Profile = require('../models/Profiles.js');
var ObjectId = mongoose.Schema.Types.ObjectId;
var callback = function(err, data) {
	if(err)
	{
		console.log("Erreur: Account, Profile => "+err);
		next(err);
	}
	else
	{
		console.log("Success: "+data);
	}
};

router.get('/', function(req, res, next){
	Profile.find({}, function(err, data){
		if(err)
		{
			console.log("Erreur: Account, Profile => "+err);
			next(err);
		}
		else
		{
			console.log("Success: "+data);
			res.json(data);
		}
	});
});

router.post('/', function(req, res, next){

	var account = new Account(
		{
			email: req.body.email,
			password: req.body.password
		});
	var profile = new Profile(
		{
			name: req.body.name,
			age: new Number(req.body.age),
			account: account._id,
			created_at: Date.now()
		});
	account.save(callback);
	profile.save(callback);

	var object = { account: account, profile: profile };
	res.json(object);

});

router.put('/', function(req, res, next){
	var objectId = new ObjectId(req.body._id);

	Account.update(
		{
			_id: objectId
		}, 
		{
			password : req.body.password
		}
		, 
		null, 
		function(err, data){
			if(err)
			{
				console.log("Erreur: Account, Profile => "+err);
				next(err);
			}
			else
			{
				console.log("Success: "+data);
				account = data;
			}});

	Profile.update(
		{
			account: objectId
		}, 
		{
			name: req.body.name,
			age: new Number(req.body.age)
		}, 
		null, 
		function(err, data){
			if(err)
				{
					console.log("Erreur: Account, Profile => "+err);
					next(err);
				}
			else
				{
					console.log("Success: "+data);
					profile = data;
				}
			}
		);

});

router.delete('/', function(req, res, next){
	var objectId = new ObjectId(req.body._id);
	var profile = {};
	var account = {};
	Profile.remove({account: objectId}, function(err, data){
			if(err)
				{
					console.log("Erreur: Account, Profile => "+err);
					next(err);
				}
			else
				{
					console.log("Success: "+data);
					profile = data;
				}});
	Account.remove({_id: objectId}, function(err, data){
			if(err)
			{
				console.log("Erreur: Account, Profile => "+err);
				next(err);
			}
			else
			{
				console.log("Success: "+data);
				account = data;
			}});
	var object = { profile: profile, account: account};
	res.json(object);
});

module.exports = router;