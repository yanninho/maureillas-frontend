'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.main')
  .controller('HomeCtrl', function ($scope, $cookies, PushService, UserService, DeviceService) {

  	var successGetUser = function(result) {
  		$scope.userConnected = true;
  	}

  	var getUser = function() {
  		var ID = $cookies.registerID; 
		var promiseGetUser = UserService.get();
  		promiseGetUser.then(successGetUser, function(error) {
  			getUser();
  		});
  	}

  	var findOrCreateUser = function() {
  		UserService.findOrCreate().then(successGetUser, function(error) {
  			findOrCreateUser();
  		});
  	}

  	var successPushRegister = function(result) {
  		findOrCreateUser();
  	}

  	var pushRegister = function() {
  		PushService.register().then(successPushRegister, function(error) {
  			pushRegister();
  		});
  	}

  	if (DeviceService.isMobile()) { 
	  // 1 - get id from cookie
	  var ID = $cookies.registerID;  	
	  // 2a - cookie exist = getUser()
	  if (angular.isDefined(ID)) {
	  	getUser();
	  }
	  else {
	  	pushRegister();
	  }
	}
	else {
		console.log('not mobile device');
	}

});