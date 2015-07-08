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
window.alert('17');
        return result;
    }

    var register = function() {
window.alert('12');
        return UserService.register().then(successGetUser, function(error) {   
window.alert('13');
            if (!NetworkService.networkConnectionExist()) {
window.alert('14');
                var deferred = $q.defer();
                deferred.reject('No network connection');  
                return deferred.promise;          
            }            
            if (angular.isUndefined(UserService.getRegisterID())) {
window.alert('15');
                return pushRegister();
            }
window.alert('16');                 
            return register();
        });
    }

    var successPushRegister = function() {
window.alert('9');
        if (angular.isUndefined(UserService.getRegisterID())) {
window.alert('10');
            return pushRegister();
        }
window.alert('11');
        return register();
    }

    var pushRegister = function() {
        if (angular.isDefined(PushService)) {
            return PushService.register().then(successPushRegister, function(error) {
                if (!NetworkService.networkConnectionExist()) {
                    var deferred = $q.defer();
                    deferred.reject('No network connection');   
                    return deferred.promise;         
                }  
window.alert('8');          
                return pushRegister();
            });
        }
        else {
            var deferred = $q.defer();
            deferred.reject('No Push service');
            return deferred.promise; 
        }
    }

 	return {
 		register : function() {
            if (DeviceService.isMobile()) { 
              return pushRegister();              
            }
            else {
                var deferred = $q.defer();
                deferred.resolve('Not on mobile device');
                window.alert('not mobile device');
                return deferred.promise;
            }
 		}
 	}   
});
