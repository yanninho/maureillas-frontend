'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.android
 * @description
 * # android
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('android', function (CONFIG) {
    
    var config = {
      "senderID": CONFIG.REMOTE.pushService.GCM.key,
    }; 

    var whenRegistered = null; 
    var whenMessageReceived = null;   

    return {
      config : function() {
        return config;
      },
      registeredSuccess : function(result) {
        // Success
        console.log(result);
      },
      setWhenRegistered: function(whenRegisteredParam) {
        whenRegistered = whenRegisteredParam;
      },
      setWhenMessageReceived: function(whenMessageReceivedParam) {
        whenMessageReceived = whenMessageReceivedParam;
      },
      notificationReceived: function(event, notification) {
        switch(notification.event) {
          case 'registered':
            if (notification.regid.length > 0 ) {
              whenRegistered(notification.regid);
            }
            break;

          case 'message':
            // this is the actual push notification. its format depends on the data model from the push server
            //alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
            whenMessageReceived(notification);            
            break;

          case 'error':
            alert('GCM error = ' + notification.msg);
            break;

          default:
            alert('An unknown GCM event has occurred');
            break;
        }
      }
    };
  });