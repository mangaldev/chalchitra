angular.module('mean.search')
.controller('MovieController', 
	['Global','$scope', '$routeParams', '$location','Movie','Rating',
	function (Global,$scope, $routeParams, $location,Movie,Rating) {
		$scope.global = Global; 
		var user = Global.user;
		var movieId =  $routeParams.movieId ;
		var oldRating;

		console.log("Got the movie id to show "+movieId);


		$scope.findMovieById = function(){
			Movie.get({movieId:movieId},function(results) {
				console.log("Got result back after querying : "+results);
				$scope.movie = results;
			});
			if (Global.authenticated) 
			{
				console.log("User "+user.username+ " got authenticated");
				$scope.userRating  = Rating.get({userName:user.username,movie:movieId},function(results) {
					console.log("Got Rating for user : "+results);
					if(results)
						oldRating = results.rating;


				});
			}
		}

		$scope.updateUserRating = function(){
			if(oldRating != $scope.userRating.rating){
				console.log("Updating rating for user "+ user.username +" from "+oldRating+" to "+$scope.userRating.rating);
				oldRating = $scope.userRating.rating;
				$scope.userRating.userName = user.username;
				$scope.userRating.movieId = movieId;
				console.log("Saving Rating ->" + $scope.userRating);
				$scope.userRating.$save();
			}

		}


	}]);