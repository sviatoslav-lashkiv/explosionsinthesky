'use strict';

// Merch Detail Controller
merchlineApp.controller('MerchDetailCtrl', [
	'$scope', '$http', '$location', '$routeParams', 'Merch',
	function($scope, $http, $location, $routeParams, Merch) {
		$scope.merchId = $routeParams.merchId;

		//var url = 'merchline/' +$routeParams.merchId+ '.json';

		Merch.get({merchId: $routeParams.merchId}, function(data){
			$scope.merch = data;
			$scope.mainImageUrl = data.images[0];
		});

		$scope.setImage = function(imageUrl) {
			$scope.mainImageUrl = imageUrl;
			console.log('another image');
		}

		console.log("array: ", $scope.carts);

		// $http.get(url).success(function(data){var merch = data;});
}]);
