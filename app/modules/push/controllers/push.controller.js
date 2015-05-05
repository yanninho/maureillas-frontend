'use strict';

angular.module('maureillasApp.feeds')
.controller('PushCtrl', function($scope, $cookies, PushService, UserService) { 
  // 1 - get id from cookie
  var ID = $cookies.registerID;
  // 2a - cookie exist = getUser()
  if (angular.isDefined(ID)) {
  	UserService.get();
  }
  // 2b cookie not exist = register to GCM => get ID => set cookie => find or create to server => getUser() 
  else {
	PushService.register().then(
	   function(result) { 
	   	  var ID = $cookies.registerID;  
	   	  var promiseGetUser =  UserService.get();
	   	  promiseGetUser.then(function(result){
	   	  	//OK
	   	  }, function(error, status) {
	   	  	 if (status == '404') {
	   	  	 	UserService.register(ID);
	   	  	 }
	   	  });
	   	  
	   }, 
	   function(err) {
	      console.log(err);
	   });  	
  }



  $scope.data = PushService.getData(); 
  if (angular.isUndefined($scope.data.deviceregisterId)) {
  	
  }

 });