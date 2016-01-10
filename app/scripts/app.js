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
    'pascalprecht.translate',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngCordova',
    'maureillasAppTemplates',
    'ngIOS9UIWebViewPatch',
    'angular-cache'
  ])
  .config(function ($routeProvider, CONFIG, $translateProvider, $translatePartialLoaderProvider) { //$translatePartialLoaderProvider, $translateProvider
    // les routes (views.json)
    angular.forEach(CONFIG.VIEWS, function(module, keyModule) {
      angular.forEach(module.pages, function(page, view) {
        console.log(page)
        $routeProvider.when(page.path, {
          templateUrl: page.templateUrl,
          controller: page.controller         
        });
      });
    });
    $routeProvider.otherwise({
      redirectTo: CONFIG.VIEWS.main.pages.home.path
    });

    //translate
    $translateProvider.preferredLanguage('fr');
    $translatePartialLoaderProvider.addPart('main');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'i18n/{lang}-{part}.json'
    });

});