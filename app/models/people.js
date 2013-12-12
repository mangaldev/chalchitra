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
    name: {type: String},
    born: {type: Date},
    asActor:[{
    	reference: { type: Schema.ObjectId, ref: 'Movie'},
    	name: String
    }],
    asProducer:[{
    	reference: { type: Schema.ObjectId, ref: 'Movie'},
    	name: String
    }],
    asSinger:[{
    	reference: { type: Schema.ObjectId, ref: 'Song'},
    	name: String
    }],
    asDirector:[{
    	reference: { type: Schema.ObjectId, ref: 'Movie'},
    	name: String
    }],
    asMusicDirector:[{
    	reference: { type: Schema.ObjectId, ref: 'Movie'},
    	name: String
    }],
    asWriter:[{
    	reference: { type: Schema.ObjectId, ref: 'Movie'},
    	name: String
    }]
});

PeopleSchema.plugin(textSearch);

mongoose.model('People', PeopleSchema);