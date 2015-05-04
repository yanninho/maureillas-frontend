'use strict';

/**
 * @ngdoc function
 * @name 
 * @description 
 */
 angular.module('maureillasApp.subscription',['maureillasApp.common', 'maureillasApp.server'])
 	.config(function($translatePartialLoaderProvider, VIEWS) {
    	//translate
 		$translatePartialLoaderProvider.addPart(VIEWS.subscription.definition.path); 
	});
