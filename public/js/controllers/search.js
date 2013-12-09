angular.module('mean.search')
.controller('SearchController', 
	['$scope', '$routeParams', '$location','Movies',
	function ($scope, $routeParams, $location,Movies) {
		$scope.searchString = $routeParams.query;
		console.log("routeParams coingn "+ $scope.searchString);
		console.log("Searching in database for moviename" + $scope.searchString);
		Movies.query({searchString: $scope.searchString},function(movies) {
			console.log("Got result back after querying : "+movies);
			$scope.movies = movies;
		});
	}]);
    