angular.module('mean.search').factory("Song", ['$resource', function($resource) {
	return $resource('song/:movieId', {movieId: '@_id'
		    }, 
		    {update: {method: 'GET'}}
		);
}]);