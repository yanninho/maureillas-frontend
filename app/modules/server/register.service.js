'use strict';

/**
 * @ngdoc service
 * @name maurellaisApp.feedsList
 * @description
 * # feedsList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp.server')
  .factory('RegisterService', function ($q, UserService, PushService, DeviceService, NetworkService, PlatformService) {
  
    var successGetUser = function(result) {
        return result;
    };

    var register = function() {
        return UserService.register().then(successGetUser, function(error) {   
            if (!NetworkService.networkConnectionExist()) {
                var deferred = $q.defer();
                deferred.reject('No network connection');  
                return deferred.promise;          
            }            
            if (angular.isUndefined(UserService.getRegisterID())) {
                return pushRegister();
            }             
            return register();
        });
    };

    var successGooglePushRegister = function() {
        if (angular.isUndefined(UserService.getRegisterID())) {
            return pushRegister();
        }
        return register();
    };

    // IOS registered
    var successIosPushRegister = function (result) {
        UserService.setRegisterID(result);
        return register();
    };

    var pushRegister = function() {
        var successHandler = successGooglePushRegister;
        if (PlatformService.isIos()) {
            successHandler = successIosPushRegister;
        }       
        if (angular.isDefined(PushService)) {
            return PushService.register().then(successHandler, function(error) {
                if (!NetworkService.networkConnectionExist()) {
                    var deferred = $q.defer();
                    deferred.reject('No network connection');   
                    return deferred.promise;         
                }           
                return pushRegister();
            });
        }
        else {
            var deferred = $q.defer();
            deferred.reject('No Push service');
            return deferred.promise; 
        }
    };

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
 	};   
});
