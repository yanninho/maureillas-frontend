'use strict';

/**
 * @ngdoc function
 * @name 
 * @description 
 */
 angular.module('maureillasApp.subscription',['maureillasApp.common', 'maureillasApp.server'])
 	.config(function($translatePartialLoaderProvider, CONFIG) {
    	//translate
 		$translatePartialLoaderProvider.addPart(CONFIG.VIEWS.subscription.definition.path); 
	});
