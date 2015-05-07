'use strict';

/**
 * @ngdoc service
 * @name maurellaisApp.feedsList
 * @description
 * # feedsList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp.server')
  .factory('RegisterService', function ($q, UserService, PushService, DeviceService, NetworkService) {


    var successGetUser = function(result) {
        return result;
    }

    var register = function() {
        return UserService.register().then(successGetUser, function(error) {   
            if (!NetworkService.networkConnectionExist()) {
                var deferred = $q.defer();
                return deferred.reject('No network connection');            
            }            
            if (angular.isUndefined(UserService.getRegisterID())) {
                return pushRegister();
            }                 
            return register();
        });
    }

    var successPushRegister = function() {
        if (angular.isUndefined(UserService.getRegisterID())) {
            return pushRegister();
        }
        return register();
    }

    var pushRegister = function() {
        return PushService.register().then(successPushRegister, function(error) {
            if (!NetworkService.networkConnectionExist()) {
                var deferred = $q.defer();
                deferred.reject('No network connection');            
            }            
            return pushRegister();
        });
    }

 	return {
 		register : function() {
            if (DeviceService.isMobile()) { 
              return pushRegister();              
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
