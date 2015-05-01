'use strict'

angular
  .module('maureillasApp', [
                'ngCookies',
                'ngMessages',
                'ngResource',
                'ngRoute',
                'ngAnimate',
                'ngTouch',
                'pascalprecht.translate',
                'ngSanitize',
                //Application modules
                'maureillasApp.common',
                'maureillasApp.feeds',
                'maureillasApp.push',
                'maureillasApp.server'
   ]);