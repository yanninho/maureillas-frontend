'use strict';

angular.module('maureillasApp.common')
.factory('NetworkService', function() {
	return {
		'networkConnectionExist' : function() {
			var connectionExist = true;
			if (navigator !== undefined && navigator.connection !== undefined) {
				connectionExist = navigator.connection.type != 'No network connection';
			}
			return connectionExist;
		}
	};
});