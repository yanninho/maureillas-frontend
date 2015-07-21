'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.subscription')
  .controller('SubscriptionCtrl', function ($scope, RegisterService, UserService, MessageService, $translate) {
  
    $scope.loading = false; 
    
    $scope.user = UserService.getUser;
    if (angular.isUndefined($scope.user.info)) {
        $scope.loading = true; 
        RegisterService.register().then(
            function(result) {
                $scope.loading = false;
            },
            function(error) {
                var message = MessageService.newMessage();
                message.type = MessageService.getTypesMessages().DANGER;
                message.textes = [error];
                MessageService.setMessage(message); 
                $scope.loading = false;                
            });        
    }
   	
    $scope.update = function() {
    	var promiseUpdate = UserService.update();
    	promiseUpdate.then(
        function() {   
			 $translate('subscription.UPDATE_OK').then(function (updateOK) {
			    var message = MessageService.newMessage();
                message.type = MessageService.getTypesMessages().SUCCESS;
			    message.textes = [updateOK];
    			MessageService.setMessage(message);
			});    		
    	},
        function(error) {
            var message = MessageService.newMessage();
            message.type = MessageService.getTypesMessages().DANGER;
            message.textes = [error];
            MessageService.setMessage(message);            
        });
    }

});