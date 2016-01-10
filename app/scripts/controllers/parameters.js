'use strict';

/**
 * @ngdoc function
 * @name maureillasApp.controller:ParametersCtrl
 * @description
 * # ParametersCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp')
  .controller('ParametersCtrl', function ($rootScope, $scope, $push, users, messages,CONFIG) {
  
    $scope.loading = false; 
    $scope.config = CONFIG;    
    $scope.user = users.getUser;
    
    document.addEventListener("deviceready", function() {
        if (angular.isUndefined($scope.user().info)) {
            $scope.loading = true; 
            $push.processPush($rootScope).then(function(result) {
                $scope.loading = false;
            },
            function(err) {
                $scope.loading = false;
            });       
        }
    });

    $scope.update = function() {
    	var promiseUpdate = users.update();
    	promiseUpdate.then(
        function() {   
			var message = messages.newMessage();
            message.type = messages.getTypesMessages().SUCCESS;
			message.textes = ['Information mise à jour'];
    		messages.setMessage(message);    		
    	},
        function(error) {
            var message = messages.newMessage();
            message.type = messages.getTypesMessages().DANGER;
            message.textes = [error];
            messages.setMessage(message);            
        });
    }

  });
