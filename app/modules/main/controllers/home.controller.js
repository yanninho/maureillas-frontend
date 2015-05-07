'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.main')
  .controller('HomeCtrl', function ($scope, RegisterService) {

    RegisterService.registerAndStore().then(function(result) {
        
        $scope.user = result;
    }, function(error) {

    });

});