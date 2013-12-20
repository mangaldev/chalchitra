module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
    app.get('/search', index.render);
    app.get('/people', index.render); 

    //Movie route
    var movies = require('../app/controllers/movies');
    var ratings = require('../app/controllers/ratings');
    var peoples = require('../app/controllers/peoples');
    var reviews = require('../app/controllers/reviews');
    var songs = require('../app/controllers/songs');

   

    app.get('/search/:searchString', movies.findMoviesByTextSearch,movies.show);
    app.get('/movie/:movieId',  movies.findMovieById,movies.show);
    app.post('/movie/:movieId', movies.updateMovieRatingById,movies.show);

    app.get('/rating/:userName/:movieId', ratings.findUserRatingByMovie,ratings.show);
    app.post('/rating',ratings.updateRating,ratings.show);

    app.get('/review/:userName/:movieId', reviews.findUserReviewsByMovie,reviews.show);
    app.get('/review/:movieId',reviews.findAllReviewsByMovie,reviews.show);
    app.post('/review',reviews.addNewReview,reviews.show);

    app.get('/people/:peopleId',peoples.findPeopleById, peoples.show);

    app.get('/song/:movieId',songs.findSongsByMovieId, songs.show);
};
