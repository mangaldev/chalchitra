/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 People = mongoose.model('People'),
 textSearch = require('mongoose-text-search'),
 _ = require('underscore');


var textSearchOptions = {
    project: 'name'
}
/**
 * Find people by id
 */
exports.findPeopleById = function(req, res, next) {
    var id = req.params.peopleId;
    console.log("Searching people by id "+id);
    People.load(id, function(err, people) {
        if (err) { 
            console.log("Error in finding by id");
            return next(err);
        }
            if (!people) return next(new Error('Failed to load people ' + id));
            console.log("Result returned from findPeopleById === " + people);
            req.people = people;
            next();
        });
};

/**
 * Find peoples by using Text Search
 */ 
exports.findPeoplesByTextSearch = function(req, res,next) {
    var id = req.params.peopleId;
    console.log("In exports.people...Got id : "+id);
    People.textSearch(id,textSearchOptions,function(err, peoples) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var resultArray = new Array();
            for (var i = peoples.results.length - 1; i >= 0; i--) {
                console.log(peoples.results[i].obj);
                resultArray[i] = peoples.results[i].obj;
            };
            req.people = resultArray;
        }
        next();
    });
};

/**
 * List of Peoples
 */
exports.all = function(req, res) {
    console.log("Executing find command");
    People.find().exec(function(err, peoples) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log("Returning jsonp of peoples");
            res.jsonp(peoples);
        }
    });
};

/**
 * Show a people
 */
exports.show = function(req, res) {
    console.log("Executing show command"+ req.people);
    res.jsonp(req.people);
};

exports.insert = function(req,res){
    console.log("");
};
