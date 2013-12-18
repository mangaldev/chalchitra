angular.module('mean.search').factory("Rating", ['$resource', function($resource) {
	return $resource('rating/:userName/:movieId', {}, 
		    {update: {method: 'GET'}}
		);
}]);