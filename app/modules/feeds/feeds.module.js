'use strict';

/**
 * @ngdoc function
 * @name 
 * @description 
 */
 angular.module('maureillasApp.feeds',['maureillasApp.common'])
    .config(function($translatePartialLoaderProvider, CONFIG) {
    //translate
    $translatePartialLoaderProvider.addPart(CONFIG.VIEWS.feeds.definition.path); 	
 });