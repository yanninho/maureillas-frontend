'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.RestService
 * @description
 * # rest
 * Factory in the pbrApp.
 */
angular.module('maureillasApp.common')
  .factory('RestService', function ($q, $http, TechnicalExceptionService, URLS) { 
      
      var promiseStart = $q.when('start');

      var httpSuccess = function(data, status, headers, config) {
        alert('success : ' + status);
        return data;
      }

      var httpError = function(data, status, headers, config) {
        alert('error : ' + status);
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

      //construit une configuration pour le service $http
      var makeConfig = function(config) {

        var finalUrl  = config.url;
        if (config.backend) {
          finalUrl = URLS.urlBackend + config.url;
        }

        return {
          url : finalUrl,
          method : config.method,
          data : config.data || '',
          params : config.params || undefined
        }
      }

      return {
        call: function(config) {   
          verifyConfig(config);  
          var makedConfig = makeConfig(config);  
          var promiseAppel = promiseStart.then(function () {
            alert(makedConfig.url  + ' : ' + makedConfig.method);
            return $http(makedConfig).
              success(httpSuccess).
              error(httpError);
          });
          return promiseAppel;
        }
    }    
});
