'use strict';

/**
 * @ngdoc service
 * @name cg66App.link external
 * @description
 * # feeds
 * Factory in the cg66App.
 */
angular.module('maureillasApp')
  .factory('linkExternal', function ($cordovaInAppBrowser, $cordovaDialogs) {
    var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'no'
    };

    var goToLink = function(link) {
        $cordovaInAppBrowser.open(link, '_system', options)
          .then(function(event) {
            // success
          })
          .catch(function(event) {
            // error
          });
        // $cordovaInAppBrowser.close();
    };

    var askUser = function() {
        return $cordovaDialogs.confirm('Voulez-vous réellement quitter l\'application et vous rendre sur le site internet ?', 'Lien externe', ['Oui','Non'])
        .then(function(buttonIndex) {
            var choice = false;
            // no button = 0, 'OK' = 1, 'Cancel' = 2
            if (buttonIndex === 1) {
                choice = true;
            }
            return choice;
        }); 
    };

    var open = function(link) {      
        document.addEventListener("deviceready", function() {
          window.open = cordova.InAppBrowser.open;
          askUser().then(function(choice) {
            if (choice) {
              goToLink(link);
            }
          });  
        });        
    }; 

  return {
    open : function(link) {
      open(link);
    }
  };

});
