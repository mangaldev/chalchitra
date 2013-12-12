angular.module('mean.search')
.controller('MoviesController', 
	['$scope', '$routeParams', '$location','Movies',
	function ($scope, $routeParams, $location,Movies) {
		var movieId =  $routeParams.movieId ;
		console.log("Searching in database for moviename"+movieId);
		Movies.get({movieId:movieId},function(movies) {
			console.log("Got result back after querying : "+movies);
			$scope.movies = movies;
		});
	}]);