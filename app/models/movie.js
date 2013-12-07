/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	config = require('../../config/config'),
	textSearch = require('mongoose-text-search'),
    Schema = mongoose.Schema;

/**
 * Movie Schema
 */



var MovieSchema = new Schema({
    title: String,
    actors: String,
    directors: String
});


MovieSchema.plugin(textSearch);


mongoose.model('Movie', MovieSchema);