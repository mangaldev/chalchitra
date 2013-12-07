/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Movie = mongoose.model('Movie'),
    textSearch = require('mongoose-text-search'),
    _ = require('underscore');


/**
 * Find movie by id
 */
exports.movie = function(req, res,next,id) {
    console.log("In exports.movie...Got id : "+id);
    Movie.textSearch(id,function(err, movies) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var resultArray = new Array();
            for (var i = movies.results.length - 1; i >= 0; i--) {
                console.log(movies.results[i].obj);
                resultArray[i] = movies.results[i].obj;
            };
            // res.jsonp(resultArray);
            req.movies = resultArray;
        }
        next();
    });
};

/**
 * List of Movies
 */
exports.all = function(req, res) {
    console.log("Executing find command");
    Movie.find().exec(function(err, movies) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log("Returning jsonp of movies");
            res.jsonp(movies);
        }
    });
};

/**
 * Show a movie
 */
exports.show = function(req, res) {
    console.log("Executing show command");
    res.jsonp(req.movies);
};
