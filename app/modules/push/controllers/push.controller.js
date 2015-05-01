'use strict';

angular.module('maureillasApp.feeds')
.controller('PushCtrl', function($scope, PushService, UserService) { 
  $scope.data = PushService.getData(); 
  if (angular.isUndefined($scope.data.deviceregisterId)) {
	  PushService.register().then(
	   function(result) {
	   	$scope.data = PushService.getData(); 
	   	 var ID = $scope.data.deviceregisterId;
	   	  console.log(result);
	   	  console.log('ID: ' + ID);	   
	   	  alert('ID: ' + ID);
	   	  if (angular.isDefined(ID)) {
	   	  	UserService.register(ID);
	   	  }	  	      
	   }, 
	   function(err) {
	      console.log(err);
	   });  	
  }

 });