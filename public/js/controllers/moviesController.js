angular.module('mean.search')
.controller('MovieController', 
	['$scope', '$routeParams', '$location','Movie',
	function ($scope, $routeParams, $location,Movie) {
		var movieId =  $routeParams.movieId ;
		console.log("Got the movie id to show "+movieId);
		Movie.get({movieId:movieId},function(movies) {
			console.log("Got result back after querying : "+movies);
			$scope.movie = movies;
            $scope.movie.userRating = "3";
		});
	}]);