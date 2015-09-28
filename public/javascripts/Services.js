angular.module('myApp.Services', [])
.service('Profile', ['$http', function($http){
	return {
		all : function() {
			return $http.get('/profiles');
		},

		add : function(object) {
			var req = {
				method: 'POST',
				url: '/profiles',
				params : object
			};
			return $http(req);
		},
		update : function(object) {
			var req = {
				method: 'PUT',
				url: '/profiles',
				params: object
			};

			return $http(req);
		},
		delete : function(object) {

			var req = {
				method: 'DELETE',
				params: object,
				url: '/profiles'
			};
			return $http(req);
		}


	};
}])
.service('Article', ['$http', function($http){
	return {
		all : function() {
			return $http.get('/articles');
		},
		get : function(_id) {
			return $http.get("/articles/"+_id);
		},
		add : function(object) {
			var req = {
				method: 'POST',
				params: object,
				url: '/articles'
			};
			return $http(req);
		},
		update : function(object) {
			var req = {
				method: 'PUT',
				params: object,
				url: '/articles'
			};
			return $http(req);
		},
		delete : function(object) {
			var req = {
				method: 'DELETE',
				params: object,
				url: '/articles'
			};
			return $http(req);
		}
	};
}]);

