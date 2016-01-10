'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.users
 * @description
 * # users
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('users', function ($q, rest, platforms, CONFIG) {

    var user = {
      registerID : undefined,
      info : undefined
    };

    var tryCreation = 0;
   
    var registerUser = function(registerId) {
      tryCreation++;

      if (angular.isDefined(registerId)) {
        user.registerID = registerId;
        var config = CONFIG.REMOTE.maureillasService.users.createUser;
        config.data = {      
                        'user': {
                          'id' : registerId,
                          'platform' : platforms.getPlatform()
                        }
                      };
        config.backend = true;
        var promiseRegisterUser = rest.call(config);
        return promiseRegisterUser.then(
          function(result) {
            tryCreation = 0;
            user.info = result.data;
            return user.info;
          },
          function(err) {
            if (tryCreation < 11) {
              registerUser(registerId);
            }            
          });        
      }
      else {
        var deferred = $q.defer();
        deferred.reject('No Register ID');
        return deferred.promise;
      }
    }; 

    var updateUser = function() {
      var config = CONFIG.REMOTE.maureillasService.users.updateUser;
      config.url = config.url.replace('{ID}', user.info._id);
      config.data = {
        feeds : user.info.feeds
      };
      config.backend =true;
      return rest.call(config);
    }; 

  return {
    register : function(id) {
      return registerUser(id);
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
  };   
});
