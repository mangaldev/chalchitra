/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Rating = mongoose.model('Rating'),
 textSearch = require('mongoose-text-search'),
 _ = require('underscore');

/**
 * find Rating
 */
 exports.findUserRatingByMovie = function(req, res) {
    var name = req.params.userName;
    console.log(name);
    var movieId = req.params.movie;
    console.log(movieId);
    Rating.findUserRatingByMovieId(name,movieId,function(err, result) {
        if (err) { 
            console.log("Error in finding by id");
            // return next(err);
        }
            console.log("Result returned from findMovieById === "+result);
            req.rating = result;
            res.jsonp(req.rating);
        });
    console.log("Executing show command for Rating Schema");
    
};


