'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.technicalException
 * @description
 * # technicalException
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('technicalException', function () {
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
