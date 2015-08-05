'use strict';

angular.module('maureillasApp.common')
.factory('_', function($window) {
	return $window._; // assumes underscore has already been loaded on the page
});