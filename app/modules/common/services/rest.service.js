'use strict';

/**
 * @ngdoc service
 * @name pbrApp.rest
 * @description
 * # rest
 * Factory in the pbrApp.
 */
angular.module('maureillasApp.common')
  .factory('RestService', function ($q, $http) { 
      
      var promiseStart = $q.when('start');

      var httpSuccess = function(data, status, headers, config) {
                return data;
              }

      var httpError = function(data, status, headers, config) {
        // ici, il est possible de rediriger les erreurs vers
        // un service de gestion des messages par exemple
        // et dans tous les cas, on renvoie quand meme l'erreur a l'appelant       
        // if (status != 400) {
        //    var message = {
        //     type: MessageService.getTypesMessages().DANGER,
        //     textes: ["Problème de communication avec le serveur"]            
        //   }         
        //   if (URLS.debug) {
        //     message.textes.push(config);
        //     message.json = true;
        //     message.timestamp = 40000;
        //   }          
        //   MessageService.setMessage(message);
        // }
        return $q.reject();        
      }

      return {
        call: function(config) {         
          var promiseAppel = promiseStart.then(function () {
            return $http(config).
              success(httpSuccess).
              error(httpError);
          });
          return promiseAppel;
        }
    }    
});
