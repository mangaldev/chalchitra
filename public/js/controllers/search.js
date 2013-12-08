angular.module('mean.search')
.controller('SearchController', 
	['$scope', '$routeParams', '$location','Movies',
	function ($scope, $routeParams, $location,Movies) {
		console.log("routeParams coingn "+ $routeParams.query);
	// $scope.search = function() {
		console.log("Searching in database for moviename"+$routeParams.query);
		Movies.query({searchString:$routeParams.query},function(movies) {
			console.log("Got result back after querying : "+movies);
			$scope.movies = movies;
		});
	}]);
    