'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.subscription')
  .controller('SubscriptionCtrl', function ($scope, UserService, MessageService, $translate) {

    UserService.get().then(function(result) {
        alert('getUser OK');
    	$scope.user = result;
    },
    function(error) {
        alert('getUser KO');
        var message = MessageService.newMessage();
        message.textes = [error];
        MessageService.setMessage(message);            
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