angular.module('mean.search').factory("People", ['$resource', function($resource) {
    return $resource('people/:peopleId', {movieId: '@_id'
            }, 
            {update: {method: 'GET'}}
        );
}]);