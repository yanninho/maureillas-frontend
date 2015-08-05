'use strict';

angular.module('maureillasApp.common')
.factory('MenuService', function($location, CONFIG, _, MessageService) {
	return {
		'go' : function(menu) {
			$location.url($location.path());
		    if (angular.isDefined(menu.param)) {	
		      $location.path( menu.path ).search(menu.param);
		    }
		    else {
		      $location.path( menu.path );
		    }  			
		},
		'find' : function(name) {
			var page = CONFIG.VIEWS.main.pages.home;
			_.each(CONFIG.VIEWS, function(view) {
				if (_.contains(_.keys(view.pages), name)) {
					page = view.pages[name];
				}
			});
			return page;
		}
	}
});