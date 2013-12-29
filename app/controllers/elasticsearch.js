var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: '54.201.156.156:9200',
	// host: 'localhost:9200',
	log: 'trace'
});


// Send a HEAD request to "/?hello=elasticsearch"
// and allow up to 1 second for it to complete.
client.ping({
	requestTimeout: 1000,
  // undocumented params are appended to the query string
  hello: "elasticsearch!"
}, function (error) {
	if (error) {
		console.error('elasticsearch cluster is down!');
	} else {
		console.log('All is well');
	}
});


/**
 * Find movies by using Text Search
 */ 
 exports.suggestMoviesBySearchString = function(req, res,next) {
 	var searchString = req.body.searchString;
 	console.log("In exports.suggestMoviesBySearchString...Got searchString : "+searchString);
 	client.suggest({
 		index: 'mbindex',
 		body: {
 			"movie_suggest": {
 				"text": searchString,
 				"completion": {
 					"field": "title_suggest",
 					"fuzzy": {
 						"edit_distance": 2
 					},
 					"size": 10
 				}
 			}
 		}
 	}).then(function(response) {
 		req.results = response;
 		next();
 	}, function(error) {
 		console.log("error --> " + error);
 	});
 };

/**
 * Find movies by using Text Search
 */ 
 exports.searchMoviesBySearchString = function(req, res,next) {
 	var searchString = req.params.searchString;
 	console.log("In exports.searchMoviesBySearchString...Got searchString : "+searchString);
 	var exprMovieSearch = "*" + searchString + "*";
 	client.search({
 		index: 'mbindex',
 		"body": {
 			"query": {
 				"bool": {
 					"should": [
 					{
 						"query_string": {
 							"default_field": "title",
 							"query": searchString,
 							"boost": 15
 						}
 					},
 					{
 						"fuzzy_like_this_field" : {
 							"title": {
 								"like_text" : searchString,
 								"boost": 10
 							}
 						}
 					},
 					{
 						"query_string": {
 							"default_field": "title",
 							"query": exprMovieSearch,
 							"boost": 1
 						}
 					}]
 				}
 			}
 		}
 	}).then(function (response) {
 		console.log(response);
 		req.results = response;
 		next();
 	}, function (error) {
 		console.log("error --> "+ error);
 	});
 };



 	exports.show = function(req, res) {
 		console.log("Executing show command for Suggestion Controller");
 		res.jsonp(req.results);
 	};

