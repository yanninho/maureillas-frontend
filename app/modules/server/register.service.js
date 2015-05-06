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
        var ID = UserService.getRegisterID(); 
        var promiseGetUser = UserService.get();
        return promiseGetUser.then(successGetUser, function(error) {
            alert(error);
            return getUser();
        });
    }

    var findOrCreateUser = function() {
        return UserService.findOrCreate().then(successGetUser, function(error) {
            alert(error);
            return findOrCreateUser();
        });
    }

    var successPushRegister = function(result) {
        return findOrCreateUser();
    }

    var pushRegister = function() {
        return PushService.register().then(successPushRegister, function(error) {
            alert(error);
            return pushRegister();
        });
    }

 	return {
 		registerAndStore : function() {
            if (DeviceService.isMobile()) { 
                alert('mobile');
              // 1 - get id from cookie
              var ID = UserService.getRegisterID();     
              // 2a - cookie exist = getUser()
              if (angular.isDefined(ID)) {
                alert('defined ID : ' + ID);
                return getUser();
              }
              else {
                alert('push Register');
                return pushRegister();
              }
            }
            else {
                alert('Not mobile');
                var deferred = $q.defer();
                deferred.resolve('Not on mobile device');
                console.log('not mobile device');
                return deferred.promise;
            }
 		}
 	}   
});
