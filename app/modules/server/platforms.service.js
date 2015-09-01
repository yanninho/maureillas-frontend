'use strict';

/**
 * @ngdoc service
 * @name maurellaisApp.feedsList
 * @description
 * # feedsList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp.server')
  .factory('PlatformService', function () {

    var getPlatform = function() {
    	var platform = '';
    	if (device.platform == 'android' || device.platform == 'Android') {
    		platform = "GOOGLE";
    	} else {
    		platform = "IOS";
    	}   
    	return platform;  
    }; 

 	return {
 		getPlatform : function() {
 			return getPlatform();
 		},
        isGoogle : function() {
            return getPlatform() === "GOOGLE";
        },
        isIos : function() {
            return getPlatform() === "IOS";
        },
 	};   
});
