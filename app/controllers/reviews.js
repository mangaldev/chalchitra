/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Review = mongoose.model('Review'),
 textSearch = require('mongoose-text-search'),
 _ = require('underscore');

/**
 * find Review
 */
 exports.findUserReviewsByMovie = function(req, res, next) {
    var name = req.params.userName;
    var movieId = req.params.movieId;
    console.log("Finding User Review using name = "+name +" and movieId = "+ movieId);
    Review.findUserReviewByMovieId(name,movieId,function(err, result) {
        if (err) { 
            console.log("Error in finding by id");
            // return next(err);
        }
        console.log("Result returned from findUserReviewByMovie === "+result);
        req.Review = result;
        next();
    });
};

/**
 * find Review
 */
 exports.findAllReviewsByMovie = function(req, res, next) {
    var movieId = req.params.movieId;
    console.log("Finding All user reviews for movieId = "+ movieId);
    Review.findAllReviewsByMovieId(movieId,function(err, result) {
        if (err) { 
            console.log("Error in finding by id");
            // return next(err);
        }
        console.log("Result returned from findAllReviewsByMovie === "+result);
        req.Review = result;
        next();
    });
};




/**
 * Update Review
 */
 exports.addNewReview = function(req, res, next) {
    var userReview = new Review(req.body);
    var name = userReview.userName;
    var movieId = userReview.movieId;
    Review.update({userName:name, movieId:movieId},{$set:{userName:name, movieId:movieId, text: userReview.text, score: 0}},{upsert:true},function (err, numberAffected, raw) {
      if (err) return handleError(err);
      console.log('The number of updated documents was %d', numberAffected);
      console.log('The raw response from Mongo was ', raw);
    });
    console.log("Updating new userReview"+ userReview);
    req.Review = userReview;
    next();
};


/**
 * Show a Review
 */
 exports.show = function(req, res) {
    console.log("Executing show command for Review Schema");
    res.jsonp(req.Review);
};