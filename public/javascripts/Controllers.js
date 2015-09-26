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
		$scope.update = function(object) {
			return Article.update(object).success(function(data, status, headers){
				console.log("Success"+data);
			}).error(function(data, status, headers){
				console.log("Error"+ status);
			});
		};
		$scope.delete = function(id) {
			return Article.delete(id).success(function(data, status, headers){
				console.log("Success Deleted !");
			}).error(function(data, status, headers){
				console.log("Error"+ status);
			});
		};

}]);