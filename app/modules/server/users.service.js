'use strict';

/**
 * @ngdoc service
 * @name maurellaisApp.feedsList
 * @description
 * # feedsList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp.server')
  .factory('UserService', function ($q, RestService, REMOTE, PlatformService, $cookies) {

    var user = {
      info : undefined
    }

    $cookies.registerID = 'APA91bFhAvNWQCNPdVHP6vOyv_IdQ4FBKeYe0VEUeXUeYjFqxwuDLKfWnNWPGVmHvNeW-0HWw68LW0vaO6CATGWkYVwuZgQ58BJGXxG3ikn1TpPNLXw6O2KDygsxbNOYyVelS5aXQB5gfisMa0yNOspSML4xFxupGA';


    var registerUser = function(registerId) {
      var config = REMOTE.maureillasService.users.createUser;
      config.url = config.url.replace('{ID}', registerId);
      config.url = config.url.replace('{PLATFORM}', PlatformService.getPlatform());
      config.backend =true;
      var promiseRegisterUser = RestService.call(config);
      promiseRegisterUser.then(function(result) {
        $cookies.registerID = registerId;
        getUser();
      });
    } 

    var getUser = function() {
      var deferred = $q.defer();
      if (angular.isDefined(user.info)) {        
        deferred.resolve(user);
        return deferred.promise;        
      }
      else {
        var registerId = $cookies.registerID;
        if (angular.isUndefined(registerId)) {
          deferred.reject('No register ID');
          return deferred.promise;            
        }
        var config = REMOTE.maureillasService.users.getUser;
        config.url = config.url.replace('{ID}', registerId);
        config.backend =true;
        var promiseGetUser = RestService.call(config);   
        return promiseGetUser.then(function(result){
          user.info = result.data;
          return user;
        });
      }
    } 

    var updateUser = function() {
      var config = REMOTE.maureillasService.users.updateUser;
      var registerId = $cookies.registerID;
      config.url = config.url.replace('{ID}', registerId);
      config.data = {
        feeds : user.info.feeds
      };
      config.backend =true;
      return RestService.call(config);
    } 

 	return {
    register : function(registerId) {
      return registerUser(registerId);
    },
    get : function() {
      return getUser();
    },
    update : function() {
      return updateUser();
    }
 	}   
});
