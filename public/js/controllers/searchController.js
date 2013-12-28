angular.module('mean.search')
.controller('SearchController', 
	['$scope', '$routeParams', '$location','Search','es',
	function ($scope, $routeParams, $location,Search,es) {
		$scope.movies= [];
		$scope.searchString = $routeParams.query;
		console.log("routeParams coingn "+ $scope.searchString);
		
		var exprMovieSearch = "*" + $scope.searchString + "*";
		console.log("Elastic Search for moviename" + $scope.searchString);
		es.search({
			index: 'mbindex',
			"body": {
				"query": {
					"bool": {
						"should": [
						{
							"query_string": {
								"default_field": "title",
								"query": $scope.searchString,
								"boost": 15
							}
						},
						{
							"fuzzy_like_this_field" : {
								"title": {
									"like_text" : $scope.searchString,
									"boost": 10
								}
							}
						},
						{
							"query_string": {
								"default_field": "title",
								"query": exprMovieSearch,
								"boost": 1
							}
						}]
					}
				}
			}
		}).then(function (response) {
			console.log(response);
			console.log(response.hits.hits.length);
			// $scope.movies = movies;
			for(var i=0;i< response.hits.hits.length;i++){
				var movie = response.hits.hits[i]._source;
				$scope.movies.push(movie);
			}
		}, function (error) {
			console.log("error --> "+ error);
		});


		$scope.getMovie = function(movie){
			console.log("clicking on this link "+movie._id);
			$location.path('movie/' + movie._id);
		}

		
	}]);
