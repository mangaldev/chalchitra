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
    title: {
        type: String
    },
    movie: {
        name: {type: String},
        reference: { type: Schema.ObjectId,ref:'Movie' }
    },
    singers: [{
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
    rating:{
        type: Number
    }
});


/**
 * Statics
 */
SongSchema.statics = {
    load: function(id, cb) {
        console.log("calling with id "+id);
        this.findOne({
            _id: id
        }).exec(cb);//.populate('actors', 'name')
    }
};


SongSchema.plugin(textSearch);

mongoose.model('Song', SongSchema);