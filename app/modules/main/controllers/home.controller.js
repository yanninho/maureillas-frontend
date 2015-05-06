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

    RegisterService.registerAndStore().then(function(result) {
        
        $scope.user = result;
    });

});