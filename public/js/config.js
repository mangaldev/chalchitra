//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/search', {
            templateUrl: 'views/search/search.html'
        }).
        // when('/search/:searchString', {
        //     templateUrl: 'views/search/search.html'
        // }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);


//Whenver there will be ! in URL ,,, this file will be in role else route.js of express will be in role
//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);