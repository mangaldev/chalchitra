angular.module('mean.search')
.controller('SearchController', 
	['$scope', '$routeParams', '$location','Search','ElasticSearch',
	function ($scope, $routeParams, $location,Search,ElasticSearch) {
		$scope.movies= [];
		$scope.searchString = $routeParams.query;
			
		ElasticSearch.query({searchString:$scope.searchString},function(response) {
			for(var i=0;i< response[0].hits.hits.length;i++){
				var movie = response[0].hits.hits[i]._source;
				$scope.movies.push(movie);
			}
		});

		$scope.getMovie = function(movie){
			$location.path('movie/' + movie._id);
		}

		
	}]);
