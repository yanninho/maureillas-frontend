'use strict';

angular.module('maureillasApp.common')
.factory('$exceptionHandler', function() {
  return function(exception, cause) {
  	alert(exception.message);
    console.log(exception.message);
  };
});