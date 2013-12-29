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
 exports.findUserRatingByMovie = function(req, res, next) {
    var name = req.params.userName;
    var movieId = req.params.movieId;
    Rating.findUserRatingByMovieId(name,movieId,function(err, result) {
        if (err) { 
            console.log("Error in finding by id");
            // return next(err);
        }
        req.rating = result;
        next();
    });
};

/**
 * Update Rating
 */
 exports.updateRating = function(req, res, next) {
    var userRating = new Rating(req.body);
    var name = userRating.userName;
    var movieId = userRating.movieId;
    Rating.update({userName:name, movieId:movieId},{$set:{rating:userRating.rating}},{upsert:true},function (err, numberAffected, raw) {
      if (err) return handleError(err);
    });
    req.rating = userRating;
    next();
};


/**
 * Show a rating
 */
 exports.show = function(req, res) {
    res.jsonp(req.rating);
};