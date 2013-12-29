angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', '$location','$http','ElasticSearch',
	function($scope, Global, $location, $http,ElasticSearch) {
		$scope.global = Global;
		$scope.moviename;

		$scope.search = function(searchTerm) {		
			console.log(searchTerm);
			if(searchTerm.title)
				$scope.moviename = searchTerm.title;
			else
				$scope.moviename = searchTerm;
			window.location = '/#!/search/' + $scope.moviename;
		};

		$scope.goToMoviePage = function(searchTerm) {
			console.log("Go to movie page "+searchTerm);
			$scope.moviename = searchTerm.title;
			window.location = '../#!/movie/'+searchTerm._id;
		};


		$scope.suggestMovies = function(searchString) {
			return $http.post('/suggest', {searchString : searchString})
			.then(function(response){
				var movieSuggestions = [];
				angular.forEach(response.data.body.movie_suggest[0].options, function(option) {
					console.log("pushing -> "+option.text+" and id -> "+option.payload._id);
					movieSuggestions.push({title: option.text, _id:option.payload._id});
				});
				return movieSuggestions;
			});
		};
	}
	]);