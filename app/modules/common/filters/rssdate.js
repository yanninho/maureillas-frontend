'use strict';

angular.module('maureillasApp.common')
.filter('rssdate',function() {
  return function(input, format) {
  	 var date = moment(input);
  	 return date.locale('fr').format('dddd D MMMM YYYY');
  };
});