'use strict';

/**
 * @ngdoc function
 * @name 
 * @description 
 */
 angular.module('maureillasApp.push',['maureillasApp.common', 'maureillasApp.server'])
    .config(function($translatePartialLoaderProvider) {
    //translate
    $translatePartialLoaderProvider.addPart('push'); 	
 });