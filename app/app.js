'use strict';

/**
 * @ngdoc overview
 * @name maureillasApp
 * @description
 * # maureillasApp
 *
 * Main module of the application.
 */
angular
  .module('maureillasApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'pascalprecht.translate',
    //Application modules
    'maureillasApp.common'
  ])
  .config(function ($routeProvider, $locationProvider,$httpProvider, $translateProvider, $translatePartialLoaderProvider, VIEWS) {
    // Interceptor pour les requêtes ajax
    $httpProvider.interceptors.push('httpInterceptor')

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