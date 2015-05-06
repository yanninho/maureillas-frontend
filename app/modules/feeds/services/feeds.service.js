'use strict';

/**
 * @ngdoc service
 * @name maurellaisApp.feedsList
 * @description
 * # feedsList
 * Factory in the maureillasApp.
 */
angular.module('maureillasApp.feeds')
  .factory('FeedListService', function (RestService, REMOTE) {

  	var model = {
  		feeds : {}
  	};


  	var getFeedSuccess = function(result) {
  		console.log(result);
  		model.feeds = result.data.responseData.feed;
  	} 

  	var getFeeds = function(urlFeed, number) {
      model.feeds = {};
  		var config = REMOTE.googleFeedsService;
  		config.params['q'] = urlFeed;
  		config.params['num'] = number;
  		var promiseGetFeed = RestService.call(config);
  		return promiseGetFeed.then(getFeedSuccess);
  	}


 	return {
 		get : model,
  	fetchFeeds : function(url, number) {
  			return getFeeds(url, number);
  	}
 	}   
});
