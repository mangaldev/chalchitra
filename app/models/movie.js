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
    title: {
        type: String
    },
    actors: [{
        reference: { type: Schema.ObjectId,ref:'People' },
        name: {type: String},
        knownAs: {type: String}
    }],
    directors: [{
        reference: { type: Schema.ObjectId,ref:'People' },
        name: {type: String}
    }],
    producers: [{
        reference: { type: Schema.ObjectId,ref:'People' },
        name: {type: String}
    }],
    musicDirectors: [{
        reference: { type: Schema.ObjectId,ref:'People' },
        name: {type: String}
    }],
    writers: [{
        reference: { type: Schema.ObjectId,ref:'People' },
        name: {type: String}
    }],
    editors: [{
        reference: { type: Schema.ObjectId,ref:'People' },
        name: {type: String}
    }],
    genre:[{
        type: String
    }],
    releaseDate:{
        type: Date
    },
    language:[{
        type: String
    }],
    country:{
        type: String
    },
    songs: [{
        reference: { type: Schema.ObjectId,ref:'Song' },
        title: {type: String}
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