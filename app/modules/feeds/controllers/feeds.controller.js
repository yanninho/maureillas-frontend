'use strict';

/**
 * @ngdoc function
 * @name pbrApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the maureillasApp
 */
angular.module('maureillasApp.feeds')
  .controller('FeedsCtrl', function ($scope, $location, FeedListService, FEEDS) {

    $scope.feedList = FeedListService.get;
    var searchUrlObject = $location.search();

    if (!angular.isUndefined(searchUrlObject["feed"])) {
      var feedValue = searchUrlObject["feed"];
      $scope.title = FEEDS[feedValue].title;
      $scope.loading = true;
      var promiseFeedList = FeedListService.fetchFeeds(FEEDS[feedValue].url, 10);
      var resultGetFeeds = function(res) {
      	$scope.loading = false;
      }
      promiseFeedList.then(resultGetFeeds, resultGetFeeds);
    }

});