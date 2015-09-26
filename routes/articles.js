var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Article = require("../models/Articles.js");
var ObjectId = mongoose.Schema.Types.ObjectId;
router.get('/', function(req, res, next) {
	Article.find({}, function(err, articles){
		if(err)
			next(err);
		else
		{
			res.json(articles);
		}
	});
});

router.get('/:slug', function(req, res, next) {
	Article.find({title: req.params.slug}, function(err, article){
		if(err)
			next(err);
		else
		{
			res.json(article);
		}
	});
});

router.post('/', function(req, res, next){
	var article = new Article({});
	article.title = req.body.title;
	article.content = req.bodycontent;
	var accountObjectId = new ObjectId("56064af0132abfbc2bba0c25");
	Account.update({_id: accountObjectId}, {articles: articles.push(article._id)}, null, function(err, data){
		if(err)
			next(err);
		else
			console.log(data);
	})
	// This is just a simulation !
	article.account = accountObjectId;
	console.log(article.account);
	article.save(function(err, article){
		if(err)
		{
			console.log("Erreur"); return;
		}
		else
		{
			console.log(article);
		}
	});
});

router.put('/', function(req, res, next){
	console.log("Request Received : "+JSON.stringify(req.body));
	var articleId = req.body._id;
	var mTitle = req.body.title;
	var mContent = req.body.content;
	Article.update(
		{_id: new ObjectId("56064af0132abfbc2bba0c28")}, 
		{title: mTitle, content: mContent}, 
		null, 
		function(err, modifiedArticle){
			if(err)
			{
				console.log("Erreur => Update"); return;
			}
			else
			{
				console.log("Success => "+modifiedArticle);
				res.json(modifiedArticle);
			}
		});
});

router.delete('/', function(req, res, next){
	var articleId = new ObjectId(req.body._id);
	Article.remove({
		_id: articleId
	},
	function(err, deletedArticle)
	{
		if(err)
		{
			console.log("Erreur! Delete"); return;
		}
		else
		{
			console.log("Success! Deleted "+deletedArticle); 
			res.json(deletedArticle);
		}
	}
	);
});

module.exports = router;