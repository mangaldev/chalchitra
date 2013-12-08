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
    titles: String,
    actors: String,
    // actors: {
        // type: Schema.Types.ObjectId,
        // ref: 'People'
    // },
    directors: String
});


MovieSchema.plugin(textSearch);

/**
 * Statics
 */
// MovieSchema.statics = {
//     load: function(id, cb) {
//         this.findOne({
//             _id: id
//         }).populate('actors', 'name').exec(cb);
//     }
// };


mongoose.model('Movie', MovieSchema);