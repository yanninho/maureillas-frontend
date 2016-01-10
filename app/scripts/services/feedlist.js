'use strict';

/**
 * @ngdoc service
 * @name maureillasApp.FeedList
 * @description
 * # FeedList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp')
  .factory('FeedList', function (rest, CacheFactory, CONFIG) {
    
    var getCache = function() {
      if (!CacheFactory.get('feeds')) {
        CacheFactory.createCache('feeds', {
          storageMode: 'localStorage'
        });
      }
      return CacheFactory.get('feeds');      
    };

    var feeds = {};
    var cache = getCache();
    var feedName = '';
    
    var setCacheData = function(feeds) {
      cache.put(feedName, feeds);
    }

    var getCacheData = function() {
      if (angular.isDefined(cache.get(feedName))) {
        feeds = cache.get(feedName);
      }
    };

    var getGoogleFeedsConfig = function(feed,number) {
      var config = CONFIG.REMOTE.googleFeedsService;
      config.params['q'] = feed.url;
      config.params['num'] = number; 
      return config;     
    };

    var getDirectHtmlConfig = function(feed) {
      var config = feed.request;
      return config;     
    };

    var getGoogleFeedSuccess = function(result) {
      feeds = result.data.responseData.feed;
      setCacheData(feeds);
    }; 

    var getDirectHtmlSuccess = function(result) {
      feeds = result.data;
      setCacheData(feeds);
    }; 

    var getFeeds = function(feedValue, number) {
      feedName = feedValue;
      getCacheData();

      var feed = CONFIG.FEEDS[feedValue];
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
      
      var promiseGetFeed = rest.call(config);
      return promiseGetFeed.then(getFeedSuccess, function() {
        if (angular.isUndefined(cache.get(feedName))) {
          feeds = {};
        }        
      });
    };


  return {
    get : function() {
      return feeds;
    },
    fetchFeeds : function(feed, number) {
        return getFeeds(feed, number);
    }
  };
});
