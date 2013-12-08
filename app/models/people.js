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
var PeopleSchema = new Schema({
    name: String,
    movies: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }
});


PeopleSchema.plugin(textSearch);

mongoose.model('People', PeopleSchema);