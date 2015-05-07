'use strict';

/**
 * @ngdoc service
 * @name maurellaisApp.feedsList
 * @description
 * # feedsList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp.server')
  .factory('RegisterService', function ($q, UserService, PushService, DeviceService) {


    var successGetUser = function(result) {
        return result;
    }

    var getUser = function() {
        var promiseGetUser = UserService.get();
        return promiseGetUser.then(successGetUser, function(error) {
            return getUser();
        });
    }

    var findOrCreateUser = function() {
        return UserService.findOrCreate().then(successGetUser, function(error) {
            return findOrCreateUser();
        });
    }

    var successPushRegister = function(result) {
        return findOrCreateUser();
    }

    var pushRegister = function() {
        return PushService.register().then(successPushRegister, function(error) {
            return pushRegister();
        });
    }

 	return {
 		registerAndStore : function() {
            if (DeviceService.isMobile()) { 
              // 1 - get id from cookie
              var ID = UserService.getRegisterID();     
              // 2a - cookie exist = getUser()
              if (angular.isDefined(ID)) {
                return getUser();
              }
              else {
                return pushRegister();
              }
            }
            else {
                var deferred = $q.defer();
                deferred.resolve('Not on mobile device');
                console.log('not mobile device');
                return deferred.promise;
            }
 		}
 	}   
});
