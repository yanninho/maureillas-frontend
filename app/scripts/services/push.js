'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.push
 * @description
 * # push
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('$push', function ($q, $cordovaPush, $cordovaDialogs, platforms, users, menu, messages) {
    
    var pushProcess = function($rootScope) {
        var q = $q.defer();
        var servicePlatform = platforms.getService();
        
        servicePlatform.setWhenMessageReceived(function(notification) {
              $cordovaDialogs.confirm('Voulez-vous ouvrir la rubrique "Evènements récents" ?', 'Nouvel article disponible', ['Oui','Non'])
                .then(function(buttonIndex) {
                  // no button = 0, 'OK' = 1, 'Cancel' = 2
                  if (buttonIndex === 1) {
                    var page = notification.payload.category;
                    var menuFound = menu.find(page);
                    menu.go(menuFound);
                  }
              });              
        });

        servicePlatform.setWhenRegistered(function(id) {
          users.register(id).then(
            function(result) {
              q.resolve('registered OK');
            },
            function(err) {
              q.reject(err);
            });
        });

          $cordovaPush.register(servicePlatform.config()).then(servicePlatform.registeredSuccess, function(err) {
            q.reject(err);
          });

          $rootScope.$on('$cordovaPush:notificationReceived', servicePlatform.notificationReceived); 

          return q.promise;   
    };

    return {
      processPush: function ($rootScope) {
        return pushProcess($rootScope);
      }
    };
  });
