'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.platforms
 * @description
 * # platforms
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('platforms', function (ios, android) {

    var isAndroid = function() {
      return device.platform === 'android' || device.platform === 'Android';
    };
    
    var getService = function() {
      var service = ios;
      if (isAndroid()) {
        service = android;
      }
      return service;
    };

    var getPlatform = function() {
      var platform = '';
      if (isAndroid()) {
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
    getService : function() {
      return getService();
    },
    isGoogle : function() {
      return getPlatform() === "GOOGLE";
    },
    isIos : function() {
      return getPlatform() === "IOS";
    }
  };  
});
