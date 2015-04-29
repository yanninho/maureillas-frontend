'use strict';

angular.module('maureillasApp.feeds')
.controller('PushCtrl', function($scope, PushService, UserService) {
  
  if (angular.isUndefined(PushService.getRegisterId())) {
	  PushService.register().then(
	   function(result) {	   	  
	      UserService.register(PushService.getRegisterId());
	   }, 
	   function(err) {
	      console.log(err);
	   });  	
  }

 });