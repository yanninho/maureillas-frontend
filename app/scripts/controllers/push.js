'use strict';

/**
 * @ngdoc function
 * @name maureillasApp.controller:PushctrlCtrl
 * @description
 * # PushctrlCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp')
  .controller('PushCtrl', function ($rootScope, $scope, $push) {
  	document.addEventListener("deviceready", function() {
  		$push.processPush($rootScope).then(
  		function(result) {
  			
  		},
  		function(err) {
  			
  		});
    });
});