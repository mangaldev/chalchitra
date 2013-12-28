angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', '$location', 'es', '$http',
	function($scope, Global, $location, es, $http) {
		$scope.global = Global;

		$scope.search = function(searchTerm) {
			window.location = '/#!/search/' + searchTerm;
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
					movieSuggestions.push({title: option.text, _id:'123'});
				});
				console.log(movieSuggestions);
				return movieSuggestions;
			}, function(error) {
				console.log("error --> " + error);
			});
		};

	}
]);