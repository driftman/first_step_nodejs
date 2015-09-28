angular.module('myApp', ['ngRoute', 'myApp.Services', 'myApp.Controllers'])
.config(function($routeProvider, $locationProvider){
	
	$routeProvider
	.when('/profiles/:id', {
		templateUrl: 'partials/profile',
		controller: 'ProfileController'
	})
	.when('/profiles', {
		templateUrl: 'partials/profiles',
		controller: 'ProfilesController'
	})
	.when('/articles', {
		templateUrl: 'partials/articles',
		controller: 'ArticlesController'
	})
	.when('/articles/add', {
		templateUrl: 'partials/addArticle',
		controller: 'ArticlesController'
	})
	.when('/articles/:_id/edit', {
		templateUrl: 'partials/editArticle',
		controller: 'ArticleController'
	});

	// .otherwise({
	// 	redirectTo: '/articles'
	// });
});