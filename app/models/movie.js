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

/*
var MovieSchema = new Schema({
    title: String,
    actors: String,
    directors: String,
    producedBy: String,
    musicBy: String,
    language: String,
    comments: [{body: String, date: Date}],
    releasedDate: {type: Date, default: Date.now},
    country: String
});
*/
mongoose.model('Movie', MovieSchema);