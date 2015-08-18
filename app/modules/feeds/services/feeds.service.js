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

    var getGoogleFeedsConfig = function(feed,number) {
      var config = CONFIG.REMOTE.googleFeedsService;
      config.params['q'] = feed.url;
      config.params['num'] = number; 
      return config;     
    }

    var getDirectHtmlConfig = function(feed) {
      var config = feed.request;
      return config;     
    }

    var getGoogleFeedSuccess = function(result) {
      feeds = result.data.responseData.feed;
    } 

    var getDirectHtmlSuccess = function(result) {
      feeds = result.data;
    } 

  	var getFeeds = function(feed, number) {
      var config = {};
      var getFeedSuccess = null;
      if (angular.isUndefined(feed.request)) {
        config = getGoogleFeedsConfig(feed, number);
        getFeedSuccess = getGoogleFeedSuccess;
      }
      else {
        config = getDirectHtmlConfig(feed);
        getFeedSuccess = getDirectHtmlSuccess;
      }
  		
  		var promiseGetFeed = RestService.call(config);
  		return promiseGetFeed.then(getFeedSuccess);
  	}


 	return {
 		get : function() {
      return feeds;
    },
  	fetchFeeds : function(feed, number) {
  			return getFeeds(feed, number);
  	}
 	}   
});
