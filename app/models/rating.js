/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	config = require('../../config/config'),
	textSearch = require('mongoose-text-search'),
    Schema = mongoose.Schema;

/**
 * Rating Schema
 */
var RatingSchema = new Schema({
    _id: String,
    userId: String,
    movieId: String,
    rating: Number
});

RatingSchema.plugin(textSearch);

mongoose.model('Rating', RatingSchema);