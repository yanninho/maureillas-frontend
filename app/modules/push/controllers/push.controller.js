'use strict';

angular.module('maureillasApp.feeds')
.controller('PushCtrl', function($scope, PushService, UserService) { 
  $scope.data = PushService.getData(); 
  if (angular.isUndefined($scope.data.deviceregisterId)) {
	  PushService.register().then(
	   function(result) {
	   	alert(result);      
	   }, 
	   function(err) {
	      console.log(err);
	   });  	
  }

 });