'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.main')
  .controller('NavigationCtrl', function ($scope, MessageService, $location) {
  	$scope.data = MessageService.getData();

	document.addEventListener("offline", onOffline, false);

	function onOffline() {
	    $location.path(VIEWS.main.pages.networkError.path);
	}

	document.addEventListener("online", onOnline, false);

	function onOnline() {
        var message = MessageService.newMessage();
		$translate('navigation.NETWORK_OK').then(function (networkOK) {
		    var message = MessageService.newMessage();
		    message.textes = [networkOK];
    		MessageService.setMessage(message);
		}); 		
	    $location.path(VIEWS.main.pages.home.path);
	}

});