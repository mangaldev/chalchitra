/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	config = require('../../config/config'),
	textSearch = require('mongoose-text-search'),
    Schema = mongoose.Schema;

/**
 * People Schema
 */
var PeopleSchema = new Schema({
    _id: String,
    name: String,
    born: Date,
    asActor:[{
    	_id: String,
    	name: String
    }],
    asProducer:[{
    	_id: String,
    	name: String
    }],
    asSinger:[{
    	_id: String,
    	name: String
    }],
    asDirector:[{
    	_id: String,
    	name: String
    }],
    asMusicDirector:[{
    	_id: String,
    	name: String
    }],
    asWriter:[{
    	_id: String,
    	name: String
    }]
});

PeopleSchema.plugin(textSearch);

mongoose.model('People', PeopleSchema);