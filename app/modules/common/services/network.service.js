'use strict';

angular.module('maureillasApp.common')
.factory('NetworkService', function() {
	return {
		'networkConnectionExist' : function() {
			var networkState = navigator.connection.type;
			return networkState != Connection.NONE;
		}
	}
});