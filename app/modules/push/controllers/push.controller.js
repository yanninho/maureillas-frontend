'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.push')
  .controller('PushCtrl', function ($rootScope, $location, $window, UserService, MenuService, MessageService) {

    // handle GCM notifications for Android
    $window.onNotificationGCM = function (event) {
      switch (event.event) {
        case 'registered':
          if (event.regid.length > 0) {
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            //send device reg id to server
            UserService.setRegisterID(event.regid);
          }
          break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (event.foreground) { 
              var my_media = new Media("/android_asset/www/" + event.soundname);
              my_media.play();
            } else {
              if (event.coldstart) {
                  //MessageService.setSuccess('COLDSTART NOTIFICATION : ' + event.payload.category);
              } else {
                  //MessageService.setSuccess('BACKGROUND NOTIFICATION');
              }
            }

            $rootScope.$apply(
              function() { 
                var page = event.payload.category;
                var menu = MenuService.find(page);
                MenuService.go(menu);
              }
            );
            
            break;

        case 'error':
            MessageService.setError('ERROR -> MSG:' + event.msg);
            break;

        default:
            MessageService.setError('EVENT -> Unknown, an event was received and we do not know what it is');
            break;
      }
    };

    // handle APNS notifications for iOS
    $window.successIosHandler = function (result) {
      console.log('result = ' + result);
    };

    $window.onNotificationAPN = function (e) {
      if (e.alert) {
        console.log('push-notification: ' + e.alert);
        navigator.notification.alert(e.alert);
      }

      if (e.sound) {
        var snd = new Media(e.sound);
        snd.play();
      }

      if (e.badge) {
        pushNotification.setApplicationIconBadgeNumber("successIosHandler", e.badge);
      }

      $rootScope.$apply(
        function() { 
          var menu = MenuService.find('actus');
          MenuService.go(menu);
        }
      );

    };

});