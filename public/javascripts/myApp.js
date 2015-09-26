var myApp = angular.module('myApp', [])
.service('Users',['$http', '$cacheFactory', function($http){

	return {
		all: function() {
			var req = {
				url: '/api',
				method: 'GET',
				cache: true,
				headers : {
					'Content-Type': 'application/json'
				}
			};
			return $http(req);
		}
	};
}])
.controller('UsersController', ['$scope','Users', function($scope, Users){
	var successCallback = function(users) {
		console.log(users.data);
		return $scope.users = users.data;
	};
	var errorCallback = function(users) {
		console.log(status);
	};
	$scope.test = "Hello World!";
	$scope.users = [];
	Users.all().then(successCallback,errorCallback);
}]);