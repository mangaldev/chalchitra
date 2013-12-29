angular.module('mean.search')
.controller('MovieController', 
	['Global','$scope', '$routeParams', '$location','$modal','Movie','Rating','Review','Song',
	function (Global,$scope, $routeParams, $location,$modal,Movie,Rating,Review,Song) {
		$scope.global = Global; 
		$scope.isCollapsed = "collapse";
		$scope.isUserReviewPresent = false;
		$scope.Math = window.Math;
		var user = Global.user;
		var movieId =  $routeParams.movieId ;
		var oldRating;

		$scope.findMovieById = function(){
			Movie.get({movieId:movieId},function(results) {
				$scope.movie = results;
			});

			if (Global.authenticated) 
			{
				Rating.get({userName:user.username,movieId:movieId},function(results) {
					$scope.userRating  = results;
					if(results)
						oldRating = results.rating;
				});
				Review.get({userName:user.username,movieId:movieId},function(results) {
					$scope.userReview =  results;
					if(results.text)  $scope.isUserReviewPresent = true;
				});


				
			}
			Review.query({movieId:movieId},function(results) {
				$scope.movieReviews =  results;
			});

			Song.query({movieId:movieId},function(results) {
				$scope.movie.songs =  results;
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

					oldRating = $scope.userRating.rating;
					$scope.userRating.userName = user.username;
					$scope.userRating.movieId = movieId;					
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
				$scope.userReview.userName = user.username;
				$scope.userReview.movieId = movieId;
				$scope.userReview.score = 0;
				$scope.userReview.$save();
				$scope.isUserReviewPresent = true;
				$scope.movieReviews.push($scope.userReview);
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
