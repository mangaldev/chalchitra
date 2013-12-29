angular.module('mean.search')
.controller('PeopleController', 
    ['$scope', '$routeParams', '$location','People',
    function ($scope, $routeParams, $location, People) {
        var peopleId =  $routeParams.peopleId ;
        People.get({peopleId: peopleId},function(people) {
            console.log("Got result back after querying : " + people);
            $scope.people = people;
        });
    }]);