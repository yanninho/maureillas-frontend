'use strict';

angular.module('maureillasApp.push')
.factory('PushService', function($q, $window, CONFIG, DeviceService) {

  var pushConfig = {};

  if (DeviceService.isMobile()) {

    if (device.platform == 'android' || device.platform == 'Android') {
      pushConfig = {
        "senderID": CONFIG.REMOTE.pushService.GCM.key,
        "ecb":"onNotificationGCM"
      };
    } else {
      pushConfig = {
        "badge":"true",
        "sound":"true",
        "alert":"true",
        "ecb":"onNotificationAPN"
      };
    }
  }
  
  return {
    register: function () {
      var q = $q.defer();
      if (DeviceService.isMobile()) {        
        if (angular.isDefined(window.plugins)) {
          window.plugins.pushNotification.register(
          function (result) {
              q.resolve(result);
          },
          function (error) {
              q.reject(error);
          },
          pushConfig); 
        }   
        else {
          q.reject('window.plugin not defined, register not possible');
        }    
      }
      else {
        q.reject('not on mobile device');        
      }
      return q.promise;
    }
  }
});
