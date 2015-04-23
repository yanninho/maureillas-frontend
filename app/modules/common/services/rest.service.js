'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.RestService
 * @description
 * # rest
 * Factory in the pbrApp.
 */
angular.module('maureillasApp.common')
  .factory('RestService', function ($q, $http, TechnicalExceptionService) { 
      
      var promiseStart = $q.when('start');

      var httpSuccess = function(data, status, headers, config) {
                return data;
              }

      var httpError = function(data, status, headers, config) {
        console.log('http error : ' + status);
        return $q.reject();        
      }

      // verifie l'objet config avec url et method
      var verifyConfig = function(config) {
        var message = ', attendu : config { url, method } voir https://docs.angularjs.org/api/ng/service/$http';
        if (angular.isUndefined(config)) {
          TechnicalExceptionService.new('objet config pour un appel Rest : [undefined]' + message);
        }
        if (angular.isUndefined(config.url)) {
           TechnicalExceptionService.new('url dans config pour un appel Rest : [undefined]' + message);
        }
        if (angular.isUndefined(config.method)) {
          TechnicalExceptionService.new('method dans config pour un appel Rest : [undefined]' + message);
        }
      }

      return {
        call: function(config) {   
          verifyConfig(config);      
          var promiseAppel = promiseStart.then(function () {
            return $http(config).
              success(httpSuccess).
              error(httpError);
          });
          return promiseAppel;
        }
    }    
});
