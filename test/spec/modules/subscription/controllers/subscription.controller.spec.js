'use strict';

describe('Controller: SubscriptionCtrl', function () {
	beforeEach(module('maureillasApp.subscription'));

	var subscriptionCtrl,
		userService,
		scope,
		deferred 
		;

	beforeEach(inject(function($controller, $q, $rootScope, UserService){
		 scope = $rootScope.$new();
		 deferred = $q.defer();
		 userService = UserService;
		 subscriptionCtrl = $controller('SubscriptionCtrl', {
			'$scope' : scope,
			'UserService' : userService
		 });
	 
	}));

});