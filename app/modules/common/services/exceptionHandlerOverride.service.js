'use strict';

angular.module('maureillasApp.common')
.factory('$exceptionHandler', function(MessageService) {
  return function(exception, cause) {
  	console.log(exception);
  	var message = MessageService.newMessage();
  	message.textes = [exception.message];
  	message.type = MessageService.getTypesMessages().DANGER;
  	MessageService.setMessage(message);  
  };
});