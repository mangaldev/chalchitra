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
    var movieId = req.params.movie;
    console.log("Finding User rating using name = "+name +" and movieId = "+ movieId);
    Rating.findUserRatingByMovieId(name,movieId,function(err, result) {
        if (err) { 
            console.log("Error in finding by id");
            // return next(err);
        }
        console.log("Result returned from findUserRatingByMovie === "+result);
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
      console.log('The number of updated documents was %d', numberAffected);
      console.log('The raw response from Mongo was ', raw);
    });
    console.log("Updating new userRating"+ userRating);
    req.rating = userRating;
    next();
};


/**
 * Show a rating
 */
 exports.show = function(req, res) {
    console.log("Executing show command for Rating Schema");
    res.jsonp(req.rating);
};