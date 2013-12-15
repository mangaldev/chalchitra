angular.module('mean.search').factory("Rating", ['$resource', function($resource) {
	return $resource('rating/:userName/:movie', {}, 
		    {update: {method: 'GET'}}
		);
}]);