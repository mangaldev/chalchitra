angular.module('mean.search').factory("Review", ['$resource', function($resource) {
	return $resource('review/:userName/:movieId', {}, 
		    {update: {method: 'GET'}}
		);
}]);