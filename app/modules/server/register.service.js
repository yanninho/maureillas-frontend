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
console.log('17');
        return result;
    }

    var register = function() {
console.log('12');
        return UserService.register().then(successGetUser, function(error) {   
console.log('13');
            if (!NetworkService.networkConnectionExist()) {
console.log('14');
                var deferred = $q.defer();
                deferred.reject('No network connection');  
                return deferred.promise;          
            }            
            if (angular.isUndefined(UserService.getRegisterID())) {
console.log('15');
                return pushRegister();
            }
console.log('16');                 
            return register();
        });
    }

    var successPushRegister = function() {
console.log('9');
        if (angular.isUndefined(UserService.getRegisterID())) {
console.log('10');
            return pushRegister();
        }
console.log('11');
        return register();
    }

    var pushRegister = function() {
console.log('4');
        if (angular.isDefined(PushService)) {
console.log('5');
            return PushService.register().then(successPushRegister, function(error) {
console.log('6');
                if (!NetworkService.networkConnectionExist()) {
console.log('7');
                    var deferred = $q.defer();
                    deferred.reject('No network connection');   
                    return deferred.promise;         
                }  
console.log('8');          
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
console.log('1');
            if (DeviceService.isMobile()) { 
console.log('3');
              return pushRegister();              
            }
            else {
console.log('2');
                var deferred = $q.defer();
                deferred.resolve('Not on mobile device');
                console.log('not mobile device');
                return deferred.promise;
            }
 		}
 	}   
});
