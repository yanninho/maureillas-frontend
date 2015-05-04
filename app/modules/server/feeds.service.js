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

    var feeds = {
      list : []
    }

    var getAll = function() {
      if (feeds.list.length > 0) {
        var deferred = $q.defer();
        deferred.resolve(feeds);
        return deferred.promise;
      }
      else {
        var config = REMOTE.maureillasService.feeds.getAll;
        config.backend =true;
        var promiseGetFeeds = RestService.call(config);
        promiseGetFeeds.then(function(result) {
          feeds.list = result;
          return feeds;
        });
        return promiseGetFeeds;
      }
    } 

 	return {
    getAll : function() {
      return getAll();
    }
 	}   
});
