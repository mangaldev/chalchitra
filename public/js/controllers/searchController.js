angular.module('mean.search')
.controller('SearchController', 
	['$scope', '$routeParams', '$location','Search',
	function ($scope, $routeParams, $location,Search) {
		$scope.searchString = $routeParams.query;
		console.log("routeParams coingn "+ $scope.searchString);
		console.log("Searching in database for moviename" + $scope.searchString);
		Search.query({searchString: $scope.searchString},function(movies) {
			console.log("Got result back after querying : "+movies);
			$scope.movies = movies;
		});

		$scope.getMovie = function(movie){
			console.log("clicking on this link "+movie._id);
			$location.path('movie/' + movie._id);
		}
	}]);
    