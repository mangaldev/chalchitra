angular.module('mean.search')
.controller('MovieController', 
	['Global','$scope', '$routeParams', '$location','$modal','Movie','Rating','Review',
	function (Global,$scope, $routeParams, $location,$modal,Movie,Rating,Review) {
		$scope.global = Global; 
		$scope.isCollapsed = "collapse";
		$scope.isUserReviewPresent = false;
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
				$scope.userRating  = Rating.get({userName:user.username,movieId:movieId},function(results) {
					console.log("Got Rating for user : "+results);
					if(results)
						oldRating = results.rating;
				});
				$scope.userReview =  Review.get({userName:user.username,movieId:movieId},function(results) {
					console.log("Got Review for user : "+results);
					if(results.text)  $scope.isUserReviewPresent = true;
				});
				
			}
			$scope.movieReviews =  Review.query({movieId:movieId},function(results) {
				console.log("Got Movie Reviews for movie  : "+movieId + " === "+results);
			});
		}

		$scope.updateUserRating = function(){
			if($scope.userRating && oldRating != $scope.userRating.rating){

				if(Global.authenticated)
				{
					if(oldRating){
						$scope.movie.rating = $scope.movie.rating - oldRating + $scope.userRating.rating;
					}
					else{
						if($scope.movie.totalUsersRated)
							$scope.movie.totalUsersRated += 1;
						else
							$scope.movie.totalUsersRated = 1;
						$scope.movie.rating = $scope.movie.rating + $scope.userRating.rating;				
					}
					console.log("Updating rating for user "+ user.username +" from "+oldRating+" to "+$scope.userRating.rating);
					oldRating = $scope.userRating.rating;
					$scope.userRating.userName = user.username;
					$scope.userRating.movieId = movieId;
					console.log("Saving Rating ->" + $scope.userRating);
					$scope.userRating.$save();
					$scope.movie.$save();
				}
				else
				{
					oldRating = $scope.userRating.rating;
					$scope.open();	
				}
			}
		}

		$scope.open = function () {
			console.log("Opening this dialog");
			var modalInstance = $modal.open({
				templateUrl: 'views/loginModal.html',
				controller: ModalInstanceCtrl
			});
		};

		$scope.submitReview = function(){
			if (Global.authenticated) 
			{
				console.log("Adding new Review for user "+user.username+" with review text -> "+ $scope.userReview.text);
				$scope.userReview.userName = user.username;
				$scope.userReview.movieId = movieId;
				$scope.userReview.score = 0;
				$scope.userReview.$save();
				$scope.isUserReviewPresent = true;
			}
			else
			{
				$scope.open();	
			}
		}
		$scope.addReview = function() {
			if (Global.authenticated) {
				$scope.isCollapsed = "collapse in";
			}else {
				$scope.open();	
			}
		}
	}]);

var ModalInstanceCtrl = function ($scope, $modalInstance) {
	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
}
