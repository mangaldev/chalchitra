//mean is the module name we are using as ng-app in our main page

angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'elasticsearch','mean.system', 'mean.search']);

angular.module('mean.system', []);
angular.module('mean.search', []);