/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Song = mongoose.model('Song'),
 textSearch = require('mongoose-text-search'),
 _ = require('underscore');

/**
 * find Songs
 */
 exports.findSongsByMovieId = function(req, res, next) {
    var movieId = req.params.movieId;
    console.log("Finding All user Songs for movieId = "+ movieId);
    Song.findSongsByMovieId(movieId,function(err, result) {
        if (err) { 
            console.log("Error in finding by id");
            // return next(err);
        }
        console.log("Result returned from findAllSongsByMovie === "+result);
        req.Songs = result;
        next();
    });
};


/**
 * Show a Song
 */
 exports.show = function(req, res) {
    console.log("Executing show command for Song Schema");
    res.jsonp(req.Songs);
};