angular.module('mean.search')
.controller('SearchController', ['$scope', '$routeParams', '$location','Movies',function ($scope, $routeParams, $location,Movies) {
	$scope.moviename = '';
	$scope.search = function() {
		Movies.query(function(movies) {
			$scope.movies = movies;
		});
	};

}]);