'use strict';

/**
 * @ngdoc service
 * @name commun.messageService
 * @description
 * # messageService
 * Factory in the MessageService.
 */
angular.module('maureillasApp.common')
  .factory('MessageService', function ($injector) {

      var TYPES_MESSAGES = {
        PRIMARY: 'alert-primary',
        SUCCESS: 'alert-success',
        WARNING: 'alert-warning',
        DANGER:  'alert-danger',        
      }

      var data = {
        message : {
          textes : undefined,
          type : TYPES_MESSAGES.PRIMARY,
          json: false,
          timestamp: 5000
        }
      }

      return {
        newMessage: function() {
          return {
            textes : undefined,
            type : TYPES_MESSAGES.PRIMARY,
            json: false,
            timestamp: 5000
          };
        },

        getTypesMessages : function() {
          return TYPES_MESSAGES;
        },

        getData: function() {
          return data;
        },
        
        setMessage: function(nouveauMessage) {
          if (angular.isUndefined(nouveauMessage)) { return; }
          if (angular.isUndefined(nouveauMessage.textes)) { return ;}

          data.message.textes = nouveauMessage.textes;
          if (!angular.isUndefined(nouveauMessage.type)) {
            data.message.type = nouveauMessage.type;
          }
          if (!angular.isUndefined(nouveauMessage.json)) {
            data.message.json = nouveauMessage.json;
          }
          
          if (!angular.isUndefined(nouveauMessage.timestamp)) {
            data.message.timestamp = nouveauMessage.timestamp;
          }
          var timeoutService = $injector.get('$timeout'); 
          timeoutService(function() {              
              data.message.textes = undefined;
              data.message.type = TYPES_MESSAGES.PRIMARY;
              data.message.json = false;
          }, data.message.timestamp);

        }
      }    
  });
