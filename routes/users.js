var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Profile = require('../models/Profiles.js');
var Account = require('../models/Accounts.js');
var Article = require('../models/Articles.js');


/* GET users listing. */
router.get('/:title', function(req, res, next){
	var object = {};
	var title = req.params.title;
	Article.findOne({title: title}).populate('account').exec(function(err, article){
		if(err)
			console.log("Erreur!");
		else
		{
			console.log("Article = "+article);
			object.article = article;
			Profile.find({account: article.account._id}, function(err, profile){
				if(err)
					console.log("Erreur!");
				else
				{
					object.profile = profile;
				}
			});
			Account.find({_id: article.account._id}).populate('articles').exec(
				function(err, account) {
					if(err)
						console.log("Erreur!");
					object.account = account;
				}
				);
		}
	});
	res.json(object);
});
router.get('/:id', function(req, res, next) {
	console.log(req.params.id);
	res.json(req.params);
});


module.exports = router;
