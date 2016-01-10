'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.ios
 * @description
 * # ios
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('ios', function ($cordovaPush) {

    var config = {
      "badge": true,
      "sound": true,
      "alert": true,
    };

    var whenRegistered = null;    
    var whenMessageReceived = null;   

    return {
      config : function() {
        return config;
      },
      registeredSuccess : function(deviceToken) {
        // Success
        whenRegistered(deviceToken);
      },    
      setWhenRegistered: function(whenRegisteredParam) {
        whenRegistered = whenRegisteredParam;
      }, 
      setWhenMessageReceived: function(whenMessageReceivedParam) {
        whenMessageReceived = whenMessageReceivedParam;
      },
      notificationReceived: function(event, notification) {
        if (notification.alert) {
          navigator.notification.alert(notification.alert);
        }

        if (notification.sound) {
          var snd = new Media(event.sound);
          snd.play();
        }

        if (notification.badge) {
          $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
            // Success!
          }, function(err) {
            // An error occurred. Show a message to the user
          });
        }
        whenMessageReceived(notification); 
      }
    };
  });
