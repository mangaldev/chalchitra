//Movie service used for articles REST endpoint
angular.module('mean.search').factory("Movies", ['$resource', function($resource) {
	return $resource('search/:searchString', {searchString: '@_id'
		    }, 
		    {update: {method: 'GET'}}
		);
}]);