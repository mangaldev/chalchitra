/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Movie = mongoose.model('Movie'),
 textSearch = require('mongoose-text-search'),
 _ = require('underscore');


 var textSearchOptions = {
    project: 'title'                // do not include the `created` property
  // , filter: { likes: { $gt: 1000000 }} // casts queries based on schema
  // , limit: 10
  // , language: 'spanish'
  // , lean: true
}
/**
 * Find movie by id
 */
 exports.findMovieById = function(req, res, next, id) {
    console.log("Searching movie by id "+id);
    Movie.load(id, function(err, movie) {
        if (err) { 
            console.log("Error in finding by id");
            return next(err);
        }
            if (!movie) return next(new Error('Failed to load movie ' + id));
            console.log("Result returned from findMovieById === "+movie);
            req.movie = movie;
            next();
        });
};

/**
 * Find movies by using Text Search
 */ 
 exports.findMoviesByTextSearch = function(req, res,next,id) {
    console.log("In exports.movie...Got id : "+id);
    Movie.textSearch(id,textSearchOptions,function(err, movies) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var resultArray = new Array();
            for (var i = movies.results.length - 1; i >= 0; i--) {
                console.log(movies.results[i].obj);
                resultArray[i] = movies.results[i].obj;
            };
            req.movie = resultArray;
        }
        next();
    });
};

/**
 * List of Movies
 */
 exports.all = function(req, res) {
    console.log("Executing find command");
    Movie.find().exec(function(err, movies) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log("Returning jsonp of movies");
            res.jsonp(movies);
        }
    });
};

/**
 * Show a movie
 */
 exports.show = function(req, res) {
    console.log("Executing show command"+ req.movie);
    res.jsonp(req.movie);
};

exports.insert = function(req,res){
    console.log("");
};
