angular.module('mean.search').factory("Movie", ['$resource', function($resource) {
	return $resource('movie/:movieId', {movieId: '@_id'
		    }, 
		    {update: {method: 'GET'}}
		);
}]);