/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    textSearch = require('mongoose-text-search'),
    Schema = mongoose.Schema;


/**
 * Song Schema
 */
var SongSchema = new Schema({
    _id: String,
    title: String,
    movie: {
        _id: String,
        name: String
    },
    singers: [{
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
    genre: [String],
    releaseDate: Date,
    language: [String],
    country: String,
    rating: Number
});


/**
 * Statics
 */
SongSchema.statics = {
    findSongsByMovieId: function(id, cb) {
        console.log("calling with id "+id);
        this.find({
            'movie._id': id
        }).exec(cb);//.populate('actors', 'name')
    }
};


SongSchema.plugin(textSearch);

mongoose.model('Song', SongSchema);