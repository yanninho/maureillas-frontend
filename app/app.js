'use strict';

/**
 * @ngdoc overview
 * @name maureillasApp
 * @description
 * # maureillasApp
 *
 * Main module of the application.
 */
 
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
                'maureillasApp.subscription',
                'angular-cache'
            ])
  .config(function ($routeProvider, $locationProvider, $translateProvider, $translatePartialLoaderProvider, $mdGestureProvider, CONFIG) {
    // les routes (views.json)
    angular.forEach(CONFIG.VIEWS, function(module, keyModule) {
      angular.forEach(module.pages, function(page, view) {
        $routeProvider.when(page.path, {
          templateUrl: 'modules/' + keyModule + '/views/'+ page.templateHtml,
          controller: page.controller        
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