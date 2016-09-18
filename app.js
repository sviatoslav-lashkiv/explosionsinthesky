'use strict';

/* Main Module */
var merchlineApp = angular.module('merchlineApp', ['ngRoute', 'ngResource'] );

/* Config */
merchlineApp.config([
	'$routeProvider', '$locationProvider',
	function($routeProvide, $locationProvider) {
		/*$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});*/
		$routeProvider
			.when('/', {
				templateUrl:'Pages/_home.html',
				controller: 'MainCtrl'
			})
			.when('/music', {
				templateUrl: 'Pages/_music.html',
				controller: 'MainCtrl'
			})
			.when('/apparel', {
				templateUrl: 'Pages/_apparel.html',
				controller: 'MainCtrl'
			})
			.when('/accessories', {
				templateUrl: 'Pages/_accessories.html',
				controller: 'MainCtrl'
			})
			.when('/gift-cards', {
				templateUrl: 'Pages/_gift-cards.html',
				controller: 'MainCtrl'
			})
			.when('/merchline/:merchId', {
				templateUrl: 'Merch-page/_merch-detail.html',
				controller: 'MerchDetailCtrl'
			})
			.when('/cart', {
				templateUrl: 'Order-page/_cart.html',
				controller: 'OrderCtrl'
			})
			.when('/order-now', {
				templateUrl: 'Order-page/_order.html',
				controller: 'OrderCtrl'
			})
			.when('/success', {
				templateUrl: 'Order-page/_success.html',
				controller: 'OrderCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
]);

/* Factory */
merchlineApp.factory('Merch', [
	'$resource', function($resource){
		return $resource('merchline/:merchId.:format', {
			merchId: 'merchline',
			format: 'json',
			apiKey: 'someKeyThis'
		}, {
			// action: {method: </>, params; </>, isArray: <?>, ...}
			update: {method: 'PUT', params: {merchId: '@merch'}, isArray: true}
			}
		);
	}
]);

/* Main Controller*/
merchlineApp.controller('MainCtrl', [
	'$scope', '$http', '$location', 'Merch',
	function($scope, $http, $location, Merch) {

		Merch.query({merchId:'merchline'}, function (data){
			$scope.merchline = data;
		})

		$scope.carts = [];

		$scope.addCart = function( title, image, category, price){
				$scope.carts.push({
						title : title,
						image: image,
						category : category,
						price : price
				});
				console.log( title + ': Add to cart!');
		};

		$scope.total = function () {
			var total = 0;
			angular.forEach( $scope.carts, function(item){
				total += item.price;
			});
			return total;
		}

		$scope.removeItem = function(carts, item) {
				carts.splice(item, 1);
				console.log("carts : " + carts);
				console.log("item: " + item);
		};

		$scope.resetCarts = function () {
			$scope.carts = [];
		}
		//$scope.merchline = Merch.query();

		//Merch.query(params, successcb, errorcb)
		//Merch.get(params, successcb, errorcb)
		//Merch.save(params, payloadData, successcb, errorcb)
		//Merch.delete(params, successcb, errorcb)

		/* $http.get('merchline.json').success(function(data, status, headers, config) {
			$scope.merchline = data;
		}); */

		//console.log( '$location.url() - ', $location.url() );
		//console.log( '$location.path() - ', $location.path() );
		//console.log( '$location.search() - ', $location.search() );
		//console.log( '$location.hash() - ', $location.hash() );
}]);








/*
 // Declare app level module which depends on views, and components
var merchlineApp = angular.module('merchlineApp', [
  'ngRoute',
  'merchlineApp.view1',
  'merchlineApp.view2',
  'merchlineApp.version'
]);

merchlineApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

 */
