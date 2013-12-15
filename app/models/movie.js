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
    _id: String,
    title: String,
    actors: [{
        _id: String,
        name: String,
        knownAs: String
    }],
    directors: [{
        _id: String,
        name: String
    }],
    producers: [{
        _id: String,
        name: String
    }],
    musicDirectors: [{
        _id: String,
        name: String
    }],
    writers: [{
        _id: String,
        name: String
    }],
    editors: [{
        _id: String,
        name: String
    }],
    genre: [String],
    releaseDate: Date,
    language: [String],
    country: String,
    songs: [{
        _id: String,
        title: String
    }],
    bio: String
});


/**
 * Statics
 */
MovieSchema.statics = {
    load: function(id, cb) {
        console.log("calling with id "+id);
        this.findOne({
            _id: id
        }).exec(cb);//.populate('actors', 'name')
    }
};


MovieSchema.plugin(textSearch);


mongoose.model('Movie', MovieSchema);