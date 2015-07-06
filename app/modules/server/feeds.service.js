'use strict';

/**
 * @ngdoc service
 * @name maurellaisApp.feedsList
 * @description
 * # feedsList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp.server')
  .factory('FeedService', function ($q, RestService, REMOTE) {

    var getAll = function() {
        var config = REMOTE.maureillasService.feeds.getAll;
        config.backend =true;
        var promiseGetFeeds = RestService.call(config);
        promiseGetFeeds.then(function(result) {
          return result;
        });
        return promiseGetFeeds;
    } 

 	return {
    getAll : function() {
      return getAll();
    }
 	}   
});
