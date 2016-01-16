'use strict';

/**
 * @ngdoc filter
 * @name maureillasApp.filter:rssdate
 * @function
 * @description
 * # rssdate
 * Filter in the maureillasApp.
 */
angular.module('maureillasApp')
  .filter('rssdate', function () {
	  return function(input, format) {
	  	 var date = moment(input);
	  	 return date.locale('fr').format('dddd D MMMM YYYY');
	  };
  });
