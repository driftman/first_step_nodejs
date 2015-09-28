angular.module('myApp.Controllers', ['myApp.Services'])
.controller('ArticlesController', 
	['$scope', 'Article', function($scope, Article ){
		$scope.articles = [];
		var articlesCallBack200 = function(data, status, headers) {
			console.log("200 : ArticlesController => Article.all() "+data);
			console.log(data.data);
			$scope.articles = data.data;
		};

		var articlesCallBack400 = function(data, status, headers) {
			console.log("400 : ArticlesController => Article.all() ");

		};
		Article.all().then(articlesCallBack200, articlesCallBack400);
		$scope.add = function(object) {
			return Article.add(object).success(function(data, status, headers){
				console.log("Success Added ! "+data);
			}).error(function(data, status, headers){
				console.log("Error"+ status);
			});
		};
		$scope.delete = function(object) {
			console.log(object);
			return Article.delete(object).success(function(data, status, headers){
				console.log("Success Deleted Controller !"+status);
			}).error(function(data, status, headers){
				console.log("Error"+ status);
			});
		};

}])
.controller('ArticleController', ['$scope', '$routeParams', 'Article', 
	function($scope, $routeParams, Article){
		$scope.test = $routeParams._id;
		$scope.article = {};
		Article.get($routeParams._id).success(
			function(data, status, headers){
				console.log("THIS IS IT : "+data);
				$scope.article = data;
			}).error(function(data, status, headers){
				console.log("Erreur ! Controller ! ArticleController ! get() "+status);
			});
		$scope.update = function(object) {
			return Article.update(object).success(function(data, status, headers){
				console.log("Success "+status);
			}).error(function(data, status, headers){
				console.log("Error"+ status);
			});
		};
	}]);