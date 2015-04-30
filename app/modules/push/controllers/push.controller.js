'use strict';

angular.module('maureillasApp.feeds')
.controller('PushCtrl', function($scope, PushService, UserService) {
  
  if (angular.isUndefined(PushService.getRegisterId())) {
	  PushService.register().then(
	   function(result) {
	   	 var ID = PushService.getData().deviceregisterId;
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