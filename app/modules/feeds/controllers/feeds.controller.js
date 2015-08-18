'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.feeds')
  .controller('FeedsCtrl', function ($scope, $location, FeedListService, CONFIG) {

    $scope.feedList = FeedListService.get;
    var searchUrlObject = $location.path().substring(1,$location.path().length);

    if (!angular.isUndefined(searchUrlObject)) {
      var feedValue = searchUrlObject;
      $scope.title = CONFIG.VIEWS.feeds.pages[feedValue].label;
      $scope.loading = true;
      var promiseFeedList = FeedListService.fetchFeeds(CONFIG.FEEDS[feedValue], 10);
      var resultGetFeeds = function(res) {
      	$scope.loading = false;
      }
      promiseFeedList.then(resultGetFeeds, resultGetFeeds);
    }

});