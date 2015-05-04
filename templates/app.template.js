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
// @if NODE_ENV='DEVELOPMENT' 
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
                'maureillasApp.main',
                'maureillasApp.feeds',
                'maureillasApp.push',
                'maureillasApp.server',
                'maureillasApp.subscription'
            ])
// @endif  
// @if NODE_ENV='PRODUCTION' 
angular
  .module('maureillasApp')
// @endif  
  .config(function ($httpProvider, $routeProvider, $locationProvider, $translateProvider, $translatePartialLoaderProvider, VIEWS) {
    $httpProvider.defaults.withCredentials = true;
    // les routes (views.json)
    angular.forEach(VIEWS, function(module, keyModule) {
      angular.forEach(module.pages, function(page, view) {
        $routeProvider.when(page.path, {
          templateUrl: 'modules/' + keyModule + '/views/'+ page.templateHtml,
          controller: page.controller          
        })
      })
    });
    //routes inconnues >> accueil
    $routeProvider.otherwise({
      // redirectTo: VIEWS.main.pages.accueil.path
    });

    //translate
    $translatePartialLoaderProvider.addPart('main');  
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'modules/{part}/i18n/{lang}.json'
    });

    // load 'fr' table on startup
    $translateProvider.preferredLanguage('fr');

  });