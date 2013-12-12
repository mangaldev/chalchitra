angular.module('mean.search')
.controller('MovieController', 
	['$scope', '$routeParams', '$location','Movies',
	function ($scope, $routeParams, $location,Movies) {
		var movieId =  $routeParams.movieId ;
		console.log("Searching in database for moviename"+movieId);
		Movies.get({movieId:movieId},function(movie) {
			console.log("Got result back after querying : " + movie);
			$scope.movie = movie;
		});
	}]);