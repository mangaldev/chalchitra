angular.module('mean.search')
.controller('SearchController', ['$scope', '$routeParams', '$location','Movies',function ($scope, $routeParams, $location,Movies) {
	$scope.moviename = '';
	$scope.search = function() {
		console.log("Searching in database for moviename"+$scope.moviename);
		Movies.query({searchString:$scope.moviename},function(movies) {
			console.log("Got result back after querying : "+movies);
			$scope.movies = movies;
		});
		// Movies.query(function(movies) {
		// 	$scope.movies = movies;
		// });
};

}]);