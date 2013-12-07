/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Movie Schema
 */

var MovieSchema = new Schema({
    title: String,
    actors: String,
    directors: String
});

mongoose.model('Movie', MovieSchema);