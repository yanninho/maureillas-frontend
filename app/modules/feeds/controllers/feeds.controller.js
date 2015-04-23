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
      FeedListService.fetchFeeds(FEEDS[feedValue].url, 10);
    }

});