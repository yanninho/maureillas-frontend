'use strict';

angular.module('maureillasApp.common')
.factory('DeviceService', function() {

      var Android = function() {
          return navigator.userAgent.match(/Android/i);
      }
      
      var BlackBerry = function() {
          return navigator.userAgent.match(/BlackBerry/i);
      }
      
      var iOS= function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      }
      
      var Opera= function() {
          return navigator.userAgent.match(/Opera Mini/i);
      }
      
      var Windows= function() {
          return navigator.userAgent.match(/IEMobile/i);
      }
     
      var any= function() {
          return (Android() || BlackBerry() || iOS() || Opera() || Windows());
      }

  return {
    isMobile : function() {
      return any();
    }
  }

});