angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', '$location', 'es', '$http',
	function($scope, Global, $location, es, $http) {
		$scope.global = Global;
		$scope.moviename;

		$scope.search = function(searchTerm) {
			console.log(searchTerm);
			if(search.title)
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

		$scope.movieSuggestion = function(searchString) {
			return es.suggest({
				index: 'mbindex',
				body: {
					"movie_suggest": {
						"text": searchString,
						"completion": {
							"field": "title_suggest",
							"fuzzy": {
								"edit_distance": 2
							},
							"size": 10
						}
					}
				}
			}).then(function(response) {
				var movieSuggestions = [];
				angular.forEach(response.movie_suggest[0].options, function(option) {
					movieSuggestions.push({title: option.text, _id:option.payload._id});
				});
				console.log("These are movie suggestions after elastic search "+movieSuggestions);
				return movieSuggestions;
			}, function(error) {
				console.log("error --> " + error);
			});
		};

	}
]);