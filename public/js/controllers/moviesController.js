angular.module('mean.search')
.controller('MovieController', 
	['Global','$scope', '$routeParams', '$location','Movie','Rating',
	function (Global,$scope, $routeParams, $location,Movie,Rating) {
		$scope.global = Global; 
		var user = Global.user;
		var movieId =  $routeParams.movieId ;
		console.log("Got the movie id to show "+movieId);
		Movie.get({movieId:movieId},function(results) {
			console.log("Got result back after querying : "+results);
			$scope.movie = results;
            // $scope.movie.userRating = "3";
        });
		if (Global.authenticated) 
		{
			console.log("User "+user.username+ " got authenticated");
			Rating.get({userName:user.username,movie:movieId},function(results) {
				console.log("Got result back after querying : "+results);
				$scope.rating = results;
				$scope.movie.userRating = results.rating;
        });
		}
	}]);