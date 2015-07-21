'use strict';

/**
 * @ngdoc service
 * @name maurellaisApp.feedsList
 * @description
 * # feedsList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp.feeds')
  .factory('FeedListService', function (RestService, CONFIG) {

  		var feeds = {};


  	var getFeedSuccess = function(result) {
  		feeds = result.data.responseData.feed;
  	} 

  	var getFeeds = function(urlFeed, number) {
      feeds = {};
  		var config = CONFIG.REMOTE.googleFeedsService;
  		config.params['q'] = urlFeed;
  		config.params['num'] = number;
  		var promiseGetFeed = RestService.call(config);
  		return promiseGetFeed.then(getFeedSuccess);
  	}


 	return {
 		get : function() {
      return feeds;
    },
  	fetchFeeds : function(url, number) {
  			return getFeeds(url, number);
  	}
 	}   
});
