'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.menu
 * @description
 * # menu
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('menu', function ($location, _, CONFIG) {
  return {
    'go' : function(menu) {
      console.log(menu)
      $location.url($location.path());
        if (angular.isDefined(menu.param)) {  
          $location.path( menu.path ).search(menu.param);
        }
        else {
          $location.path( menu.path );
        }       
    },
    'find' : function(name) {
      var page = CONFIG.VIEWS.feeds.pages.actualites;
      // on renvois toujours vers la page actualites
      // _.each(CONFIG.VIEWS, function(view) {
      //   if (_.contains(_.keys(view.pages), name)) {
      //     page = view.pages[name];
      //   }
      // });
      return page;
    }
  }
});
