/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
    _id: String,
    userName: String,
    movieId: String,
    Score: Number,
    posted: Date,
    text: String
});


/**
 * Statics
 */
ReviewSchema.statics = {
    findUserReviewByMovieId: function(userName, movieId, cb) {
        console.log("calling with id "+movieId +" userName "+ userName);
        this.findOne({
            userName: userName,
            movieId: movieId
        }).exec(cb);//.populate('actors', 'name')
    },
    findAllReviewsByMovieId: function(movieId, cb) {
        console.log("calling with id "+movieId);
        this.find({
            movieId: movieId
        }).exec(cb);//.populate('actors', 'name')
    }

};


mongoose.model('Review', ReviewSchema);