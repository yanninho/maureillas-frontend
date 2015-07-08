'use strict';

/**
 * @ngdoc service
 * @name maurellaisApp.feedsList
 * @description
 * # feedsList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp.server')
  .factory('UserService', function ($q, RestService, REMOTE, PlatformService) {

    var user = {
      registerID : undefined,
      info : undefined
    }

    var registerUser = function() {
      var registerId = user.registerID;
      if (angular.isDefined(registerId)) {
        var config = REMOTE.maureillasService.users.createUser;
        config.data = {      
                        'user': {
                          'id' : registerId,
                          'platform' : PlatformService.getPlatform()
                        }
                      }
        config.backend =true;
        var promiseRegisterUser = RestService.call(config);
        return promiseRegisterUser.then(function(result) {
          user.info = result.data;
          return user.info;
        });        
      }
      else {
        var deferred = $q.defer();
        deferred.reject('No Register ID');
        return deferred.promise;
      }
    } 

    var updateUser = function() {
      var config = REMOTE.maureillasService.users.updateUser;
      var registerId = user.registerID;
      config.url = config.url.replace('{ID}', user.info._id);
      config.data = {
        feeds : user.info.feeds
      };
      config.backend =true;
      return RestService.call(config);
    } 

 	return {
    register : function() {
      return registerUser();
    },
    update : function() {
      return updateUser();
    },
    getRegisterID : function() {
      return user.registerID;
    },
    setRegisterID : function(id) {
      user.registerID = id;
    },
    getUser : function() {
      return user;
    }
 	}   
});
