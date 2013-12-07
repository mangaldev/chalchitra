//Articles service used for articles REST endpoint
angular.module('mean.search').factory("Movies", ['$resource', function($resource) {
	return $resource('search/:movieId', {
        movieId: '@_id'
    }, {
        update: {
            method: 'GET'
        }
    });
}]);