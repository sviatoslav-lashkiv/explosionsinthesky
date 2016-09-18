// Order Controller
merchlineApp.controller('OrderCtrl', [
	'$scope', '$http', '$location', 'Merch',
 function($scope, $http, $location, Merch) {

	Merch.query({merchId:'shipping-methods'}, function (data){
		$scope.shippingMethods = data;
	});

	$scope.priceCount = $scope.total();

	$scope.totalPrice = function (shipping) {
		$scope.priceCount = $scope.total() + shipping;
		console.log("Add shipping price!", 'price: ' + $scope.priceCount, 'shipping: ' + shipping);
		return $scope.priceCount;
	}

}]);
