angular.module('mean.system').controller('HeaderController', 
	['$scope', 'Global','$location', 
	function ($scope, Global,$location) {
		$scope.global = Global;
		$scope.search = function(searchTerm) {
			window.location = '/#!/search/' + searchTerm;
		};
	}]);