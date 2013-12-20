angular.module('mean.search').factory('youtube', ['constants', function(constants) {
  function makeCacheKey(service, params) {
    return service + JSON.stringify(params);
  }

  return function(options) {
    options.path = [constants.YOUTUBE_API_SERVICE, constants.YOUTUBE_API_VERSION, options.service].join('/');

    var cacheKey = makeCacheKey(options.service, options.params);
    // var results = lscache.get(cacheKey);

    if (options.method == 'GET' && results) {
      setTimeout(function() {
        options.callback(results)
      }, 1);
    } else {
      // gapi.client.request will "helpfully" try to invoke options.callback for us automatically...
      var callback = options.callback;
      delete options.callback;

      var cacheTimeout = constants.YOUTUBE_CACHE_MINUTES;
      if ('cacheTimeoutMinutes' in options) {
        cacheTimeout = options.cacheTimeoutMinutes;
      }

      var request = gapi.client.request(options);
      request.execute(function(results) {
        if (options.method == 'GET' && results && !('error' in results)) {
          lscache.set(cacheKey, results, cacheTimeout);
        }

        callback(results);
      });
    }
  };
}]);