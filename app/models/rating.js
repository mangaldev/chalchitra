/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Rating Schema
 */
var RatingSchema = new Schema({
    _id: String,
    userName: String,
    movieId: String,
    rating: Number
});


/**
 * Statics
 */
RatingSchema.statics = {
    findUserRatingByMovieId: function(userName, movieId, cb) {
        console.log("calling with id "+movieId +" userName "+ userName);
        this.findOne({
            userName: userName,
            movieId: movieId
        }).exec(cb);//.populate('actors', 'name')
    }

};


mongoose.model('Rating', RatingSchema);