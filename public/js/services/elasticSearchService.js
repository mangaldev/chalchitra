//Movie service used for articles REST endpoint
angular.module('mean.search').factory("ElasticSearch", 
	['$resource', function($resource) {
	return $resource(
				'suggest/:searchString', 
				{searchString: '@_id'}, 
			    {update: 
			    	{method: 'GET'}
			    }
			);
}]);