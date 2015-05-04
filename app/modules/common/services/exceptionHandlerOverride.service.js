'use strict';

angular.module('maureillasApp.common')
.factory('$exceptionHandler', function(MessageService) {
  return function(exception, cause) {
  		MessageService.setMessage(exception);
  };
});