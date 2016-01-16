'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.exceptionHandler
 * @description
 * # exceptionHandler
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('$exceptionHandler', function (messages) {
  return function(exception, cause) {
    console.log(exception);
    var message = messages.newMessage();
    message.textes = [exception.message];
    message.type = messages.getTypesMessages().DANGER;
    messages.setMessage(message);  
  };
});
