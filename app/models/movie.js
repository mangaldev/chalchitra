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
        id: String,
        text: String,
        type: String
    },
    actors: [{
        people: {
            _id: String,
            id: String,
            text: String,
            type: String
        },
        role: String
    }],
    directors: [{
        _id: String,
        id: String,
        text: String,
        type: String
    }],
    producers: [{
        _id: String,
        id: String,
        text: String,
        type: String
    }],
    musicDirectors: [{
        _id: String,
        id: String,
        text: String,
        type: String
    }],
    writers: [{
        _id: String,
        id: String,
        text: String,
        type: String
    }],
    editors: [{
        _id: String,
        id: String,
        text: String,
        type: String
    }],
    genre: [{
         _id: String,
         id: String,
         text: String,
         type: String
    }],

    releaseDate: Date,

    language:[{
         _id: String,
         id: String,
         text: String,
         type: String
    }],

    country:[{
         _id: String,
         id: String,
         text: String,
         type: String
    }],

    songs: [{
        _id: String,
        title: String,
        type: String
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