'use strict';

/**
 * @ngdoc service
 * @name pbrApp.rest
 * @description
 * # rest
 * Factory in the pbrApp.
 */
angular.module('maureillasApp.common')
  .factory('TechnicalExceptionService', function () {

      return {
        new : function(message) {
          function TechnicalException(message) {
            this.name = 'TechnicalException';
            this.message = message;
          }
          TechnicalException.prototype = new Error();
          TechnicalException.prototype.constructor = TechnicalException;     
          throw new TechnicalException(message);
        }
    }    
});
