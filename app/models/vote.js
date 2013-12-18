/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Vote Schema
 */
var VoteSchema = new Schema({
    _id: String,
    userName: String,
    movieId: String,
    reviewId: String,
    Vote: Number
});


/**
 * Statics
 */
VoteSchema.statics = {
    findUserVoteByMovieId: function(userName, movieId, cb) {
        console.log("calling with id "+movieId +" userName "+ userName);
        this.findOne({
            userName: userName,
            movieId: movieId
        }).exec(cb);//.populate('actors', 'name')
    }

};


mongoose.model('Vote', VoteSchema);