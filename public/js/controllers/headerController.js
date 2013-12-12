angular.module('mean.system').controller('HeaderController', 
	['$scope', 'Global','$location', 
	function ($scope, Global,$location) {
		$scope.global = Global;    
		$scope.isCollapsed = false;
		$scope.moviename = '';
		$scope.search = function() {
			$location.path('search/' + $scope.moviename);
		};
	}]);