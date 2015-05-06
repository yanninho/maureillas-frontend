'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.subscription')
  .controller('SubscriptionCtrl', function ($scope, RegisterService, UserService, MessageService, $translate, $location, VIEWS) {

    $scope.available = false;

    RegisterService.registerAndStore().then(function(result) {
        $scope.available = true;
        $scope.user = result;
    });
   	
    $scope.update = function() {
    	var promiseUpdate = UserService.update();
    	promiseUpdate.then(function() {    		
			 $translate('subscription.UPDATE_OK').then(function (updateOK) {
			    var message = MessageService.newMessage();
			    message.textes = [updateOK];
    			MessageService.setMessage(message);
			});    		
    	},
        function(error) {
            var message = MessageService.newMessage();
            message.textes = [error];
            MessageService.setMessage(message);            
        });
    }

});