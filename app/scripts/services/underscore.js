'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.underscore
 * @description
 * # underscore
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('_', function ($window) {
  return $window._; // assumes underscore has already been loaded on the page
});
