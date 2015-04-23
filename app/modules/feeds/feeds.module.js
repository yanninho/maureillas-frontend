'use strict';

/**
 * @ngdoc function
 * @name 
 * @description 
 */
 angular.module('maureillasApp.feeds',['maureillasApp.common'])
    .config(function($translatePartialLoaderProvider, VIEWS) {
    //translate
    $translatePartialLoaderProvider.addPart(VIEWS.feeds.definition.path); 	
 });