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
    data: {
        text: String
    },
    actors: [{
        people: {
            _id: String,
            text: String
        },
        role: String
    }],
    directors: [{
        _id: String,
        text: String
    }],
    producers: [{
        _id: String,
        text: String
    }],
    musicDirectors: [{
        _id: String,
        text: String
    }],
    writers: [{
        _id: String,
        text: String
    }],
    editors: [{
        _id: String,
        text: String
    }],
    genre: [{
         _id: String,
         text: String
    }],

    releaseDate: Date,

    language:[{
         _id: String
         text: String
    }],

    country:[{
         _id: String
         text: String
    }],

    songs: [{
        _id: String,
        title: String
    }],
    bio: String,
    rating: Number,
    totalUsersRated: Number
});


/**
 * Statics
 */
 MovieSchema.statics = {
    load: function(id, cb) {
        console.log("calling with id "+ id);
        this.findOne({
            _id: id
        }).exec(cb);//.populate('actors', 'name')
    }


};


MovieSchema.plugin(textSearch);


mongoose.model('Movie', MovieSchema);