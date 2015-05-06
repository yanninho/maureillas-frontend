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

    var registerUser = function(registerId) {
      var config = REMOTE.maureillasService.users.createUser;
      config.url = config.url.replace('{ID}', registerId);
      config.url = config.url.replace('{PLATFORM}', PlatformService.getPlatform());
      config.backend =true;
      var promiseRegisterUser = RestService.call(config);
      return promiseRegisterUser.then(function(result) {
        $cookies.registerID = registerId;
        return getUser();
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
      config.url = config.url.replace('{ID}', user.info._id);
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
    },
    findOrCreate : function() { 
        var promiseGetUser =  getUser();
        return promiseGetUser.then(function(result){
          return result;
        }, function(error, status) {
           if (status == '404') {
            var ID = $cookies.registerID; 
            return registerUser(ID);
           }
        });
    }
 	}   
});
