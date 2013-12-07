/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Movie = mongoose.model('Movie'),
    _ = require('underscore');

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
