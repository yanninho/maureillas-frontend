'use strict';

/**
 * WARNING GENERATED FROM TEMPLATE
 * @ngdoc overview
 * @name maureillasApp
 * @description
 * # maureillasApp
 *
 * Main module of the application.
 */
angular
  .module('maureillasApp')
  .config(function ($httpProvider, $routeProvider, $locationProvider, $translateProvider, $translatePartialLoaderProvider, VIEWS) {
    $locationProvider.html5Mode(true);
    $httpProvider.defaults.withCredentials = true;
    // les routes (views.json)
    angular.forEach(VIEWS, function(module, keyModule) {
      angular.forEach(module.pages, function(page, view) {
        $routeProvider.when(page.path, {
          templateUrl: 'modules/' + keyModule + '/views/'+ page.templateHtml,
          controller: page.controller,
          resolve : {
            'network' : function($location, NetworkService, DeviceService) { 
              if (page.label != VIEWS.main.pages.networkError.label && DeviceService.isMobile())  {
                // network error
                if (!NetworkService.networkConnectionExist()) {   
                  $location.path(VIEWS.main.pages.networkError.path);
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
      redirectTo: VIEWS.main.pages.home.path
    });

    //translate
    $translatePartialLoaderProvider.addPart('main');  
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'modules/{part}/i18n/{lang}.json'
    });

    // load 'fr' table on startup
    $translateProvider.preferredLanguage('fr');

  });