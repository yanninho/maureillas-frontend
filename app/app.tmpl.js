'use strict';

// @if NODE_ENV='DEVELOPMENT' 
    /* WARNING GENERATED FROM TEMPLATE */
// @endif

/**
 * @ngdoc overview
 * @name maureillasApp
 * @description
 * # maureillasApp
 *
 * Main module of the application.
 */
 
// @if NODE_ENV='DEVELOPMENT' || NODE_ENV='DESKTOP'
/* DESKTOP VERSION */
angular
  .module('maureillasApp', [
                'ngMessages',
                'ngResource',
                'ngRoute',
                'ngAnimate',
                'ngTouch',
                'pascalprecht.translate',
                'ngSanitize',
                'ngMaterial',
                //Application modules
                'maureillasApp.common',
                'maureillasApp.main',
                'maureillasApp.feeds',
                'maureillasApp.push',
                'maureillasApp.server',
                'maureillasApp.subscription'
            ])
// @endif  
// @if NODE_ENV='MOBILE' 
/* MOBILE VERSION */
angular
  .module('maureillasApp')
// @endif  
  .config(function ($httpProvider, $routeProvider, $locationProvider, $translateProvider, $translatePartialLoaderProvider, CONFIG) {
    $httpProvider.defaults.withCredentials = true;
    // les routes (views.json)
    angular.forEach(CONFIG.VIEWS, function(module, keyModule) {
      angular.forEach(module.pages, function(page, view) {
        $routeProvider.when(page.path, {
          templateUrl: 'modules/' + keyModule + '/views/'+ page.templateHtml,
          controller: page.controller,
          resolve : {
            'network' : function($location, NetworkService, DeviceService) { 
              if (page.label != CONFIG.VIEWS.main.pages.networkError.label && DeviceService.isMobile())  {
                // network error
                if (!NetworkService.networkConnectionExist()) {   
                  $location.path(CONFIG.VIEWS.main.pages.networkError.path);
                  return false;
                }                 
              }              
              return true;
            }            
          }          
        })
      })
    });
    //routes inconnues >> accueil
    $routeProvider.otherwise({
      redirectTo: CONFIG.VIEWS.main.pages.home.path
    });

    //translate
    $translatePartialLoaderProvider.addPart('main');  
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'modules/{part}/i18n/{lang}.json'
    });

    // load 'fr' table on startup
    $translateProvider.preferredLanguage('fr');

  });