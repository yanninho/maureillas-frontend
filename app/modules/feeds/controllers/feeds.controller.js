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
    var searchUrlObject = $location.search();

    if (!angular.isUndefined(searchUrlObject["feed"])) {
      var feedValue = searchUrlObject["feed"];
      $scope.title = CONFIG.FEEDS[feedValue].title;
      $scope.loading = true;
      var promiseFeedList = FeedListService.fetchFeeds(CONFIG.FEEDS[feedValue].url, 10);
      var resultGetFeeds = function(res) {
      	$scope.loading = false;
      }
      promiseFeedList.then(resultGetFeeds, resultGetFeeds);
    }

});