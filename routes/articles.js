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

router.get('/:id', function(req, res, next) {
	console.log('Inside GET :id');
	console.log(req.params.id);

	Article.find({_id: req.params.id}, function(err, article){
		if(err)
			next(err);
		else
		{
			res.json(article);
		}
	});
});

router.post('/', function(req, res, next){
	console.log("POST /articles/ Request Body => "+req.query);
	console.log(req.query);
	var article = new Article(
		{ 
			account: new mongoose.Types.ObjectId("5608d1d84b77357a0c2cdad2")
		});
	article.title = req.query.title;
	article.content = req.query.content;
	console.log(article.account);
	article.save(function(err, article){
		if(err)
		{
			console.log("Erreur = >"+err); next();
		}
		else
		{
			console.log(article);
			return;
		}
	});
	res.json(article);
});

router.put('/', function(req, res, next){
	var articleId = req.body._id;
	var mTitle = req.query.title;
	var mContent = req.query.content;
	Article.update(
		{_id: new mongoose.Types.ObjectId(articleId)}, 
		{title: mTitle, content: mContent}, 
		null, 
		function(err, modifiedArticle){
			if(err)
			{
				console.log("Erreur => Update"); next();
			}
			else
			{
				res.json(modifiedArticle);
				return;
			}
		});
});

router.delete('/', function(req, res, next){
	var articleId = req.query._id;
	console.log("Backend "+articleId);

	Article.remove({ _id: articleId}, function(err){
		if(err)
			{
				console.log(err);
				next();
			}
		else
			{
				console.log("Success");
				res.json({ flash: "Deleted Successfully !"});
			}
	});

	
});

module.exports = router;